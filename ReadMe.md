# Vanilla Todo App Assessment

## In 1 week, please complete as many of the App Requirents as possible.

This template uses parcel.js to bundle the TypeScript and CSS for you. I have provided the HTML and CSS. Currently it is static HTML in the index.html file. You can start coding right away in the index.ts file in the src directory.

### Notes
- Use of a tutorial is not allowed. If you copy a full tutorial wholesale, it will be seen as plagerism.
- Googling TS functions, and features is ok. You are not expected to have every thing about TS memorized. Example: You can't remember what parameters the callback function of Array.reduce() receives, Google the MDN
- Editing the HTML/CSS is allowed if needed/wanted
- Examples of the ```<li>``` css is provided in the HTML with CSS classes for examples

### App Requirements
- App must be written in vanilla typescript. No libraries or frameworks. I.E. No React, Jquery, VueJS, ect.
- App must use the provided inital todos. (todos var in index.ts) When initially loaded, it should show the provided todos with their correct state (completed or not).
- User should be able to add todos via the Enter new task input field
  - When user adds a todo, it should add to the todos array, creating a new id that is one count higher than the last one
  - User should be able to add todo via plus button
  - User should be able to add todo via pressing the enter key
  - App should display the new todo in the not completed state
- I should be able to inspect the todo array provided at at time and it should match the state of the app shown to the user.
- User should be able to complete todos
  - User completes todos by clicking on todo
  - When user completes todo, it should update the correct todo object in the todos array
- User should be able to un-complete todos
  - User changes todo from complete to not complete by clicking todo
- User should be able to delete individual todos.
  - User deletes todos by clicking on the red garbage can when hovering on todo
  - When user deletes todo from app, the todo is removed from the todos array
  - BONUS: Deleted todos aren't removed and are instead marked as deleted and not shown to the user
- User should be able to clear (delete) all todos that are done when they click the clear done button
  - The todos array should be updated accordingly
  - The UI should update accordingly
- The app should update the number of pending tasks based on the number of todos in the todos array that aren't complete
- User should be able to edit todos
  - Edit happens when a user double clicks a todo.
  - When editing, the todo should be replaced with a text field with the current todo as its value.
  - When editing the todo should be saved when the user presses the enter buton
  - When the user is done editing, the text field should be replaced with the new todo