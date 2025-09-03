import "./styles.css";

// Expose a LIVE getter so `todos` in DevTools always reflects current state
Object.defineProperty(window as any, "todos", {
  get() {
    return todos;
  },
  configurable: true,
});

// initial todos
// DO NOT EDIT THIS ARRAY
// You may add props to objects if needed.
let todos = [
  {
    todoID: 0,
    todoText: "Finish Homework",
    todoComplete: false,
  },
  {
    todoID: 1,
    todoText: "Walk the dog",
    todoComplete: true,
  },
  {
    todoID: 2,
    todoText: "Clean my room",
    todoComplete: false,
  },
];

// Grab the UL from HTML
const listEl = document.querySelector(".todoList") as HTMLUListElement;
const footerText = document.querySelector(".footer span") as HTMLSpanElement;

// Render function
function renderTodos() {
  listEl.innerHTML = "";

  todos.forEach((todo) => {
    const li = document.createElement("li");
    if (todo.todoComplete) li.classList.add("done");

    //Use a plain text node so CSS for li span (trash/edit) doesn't affect it
    li.append(document.createTextNode(todo.todoText));

    // --- click vs dblclick coordination (single-click toggle, dblclick edit) ---
    let clickTimer: number | null = null;

    // Single-click: toggle complete (delay to allow dblclick to cancel)
    li.addEventListener("click", () => {
      if (clickTimer !== null) return;
      clickTimer = window.setTimeout(() => {
        todo.todoComplete = !todo.todoComplete;
        renderTodos();
        clickTimer = null;
      }, 250);
    });

    // Double-click: enter edit mode (and cancel pending single-click)
    li.addEventListener("dblclick", () => {
      if (clickTimer !== null) {
        clearTimeout(clickTimer);
        clickTimer = null;
      }

      const editInput = document.createElement("input");
      editInput.type = "text";
      editInput.value = todo.todoText;

      li.innerHTML = ""; // clear li
      li.appendChild(editInput); // only the input while editing
      // ✅ Block input interactions from bubbling to the <li> (prevents toggle)
      const swallow = (ev: Event) => ev.stopPropagation();
      editInput.addEventListener("pointerdown", swallow);
      editInput.addEventListener("click", swallow);
      editInput.addEventListener("dblclick", swallow);

      editInput.focus();
      editInput.setSelectionRange(
        editInput.value.length,
        editInput.value.length
      );

      const finishEdit = () => {
        const v = editInput.value.trim();
        if (v) todo.todoText = v; // keep old text if empty
        renderTodos();
      };

      editInput.addEventListener("keydown", (e) => {
        if (e.key === "Enter") finishEdit();
        if (e.key === "Escape") renderTodos(); // cancel
      });
      editInput.addEventListener("blur", finishEdit);
    });
    // --- end click/dblclick coordination ---

    // Trash button (this span is intended to be positioned by your CSS)
    const delBtn = document.createElement("span");
    delBtn.innerHTML = `<i class="fa fa-trash"></i>`;
    delBtn.addEventListener("click", (e) => {
      e.stopPropagation(); // don't trigger click/dblclick handlers
      todos = todos.filter((t) => t.todoID !== todo.todoID);
      renderTodos();
    });

    li.appendChild(delBtn);
    listEl.appendChild(li);
  });

  // Update footer count
  const pending = todos.filter((t) => !t.todoComplete).length;
  footerText.textContent = `You have ${pending} pending task${
    pending !== 1 ? "s" : ""
  }.`;
}

// Run once when page loads
renderTodos();

// Input and plus button refrences
const inputEl = document.querySelector(".inputField input") as HTMLInputElement;
const addBtn = document.querySelector(
  ".inputField button"
) as HTMLButtonElement;

// Create To-do function
function addTodo() {
  const text = inputEl.value.trim();
  if (!text) return; // ignore empty input

  const newId = todos.length ? Math.max(...todos.map((t) => t.todoID)) + 1 : 0;

  todos.push({
    todoID: newId,
    todoText: text,
    todoComplete: false,
  });

  inputEl.value = ""; // clear input
  renderTodos(); // refresh list
}

addBtn.addEventListener("click", addTodo);

inputEl.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    addTodo();
  }
});

// Adding functionality to the clear done button
const clearBtn = document.querySelector(".footer button") as HTMLButtonElement;
clearBtn.addEventListener("click", () => {
  todos = todos.filter((t) => !t.todoComplete); // keep only not completed
  renderTodos();
});
