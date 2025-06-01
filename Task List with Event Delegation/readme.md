# Task List with Event Delegation

This project demonstrates how to use JavaScript event delegation to handle click events on a list of tasks. When a task is clicked, its text is crossed out (or the cross-out is removed if already applied).

## 🌟 Features

- Clickable tasks that toggle a "completed" state.
- Uses event delegation for efficient event handling.
- Simple and clean HTML, CSS, and JavaScript.

## 🛠️ Technologies Used

- HTML5
- CSS3
- JavaScript (ES6+)

## 🚀 Setup and Usage   

1.  **Ensure you have the files:**
    Place the following files in the same directory:

    - `index.html`
    - `style.css`
    - `script.js`

2.  **Open `index.html` in your web browser.**
    You will see a list of tasks. Click on any task to toggle its completed state (line-through text).

## 📂 File Structure

```
.
├── index.html       # The main HTML structure for the task list
├── style.css        # CSS styles for the tasks and the completed state
└── script.js        # JavaScript code for event delegation and toggling task state
```

## 💡 How It Works

### HTML (`index.html`)

The HTML provides a basic structure with an unordered list (`<ul>`) having the ID `tasks`. Each task is an `<li>` element within this list.

```html
<ul id="tasks">
  <li>Task A</li>
  <li>Task B</li>
  <li>Task C</li>
</ul>
```

### CSS (`style.css`)

The CSS styles the list and list items. A key part is the `.completed` class, which applies `text-decoration: line-through;` to visually mark a task as completed.

```css
#tasks li.completed {
  text-decoration: line-through;
  color: #aaa;
  background-color: #e9e9e9; /* Optional: visual feedback for completed state */
}

#tasks li {
  cursor: pointer; /* Indicates the items are clickable */
}
```

### JavaScript (`script.js`) - Event Delegation

The JavaScript code implements event delegation:

1.  **Get Parent Element**: It first gets a reference to the parent `<ul>` element with the ID `tasks`.
    ```javascript
    const taskList = document.getElementById("tasks");
    ```
2.  **Attach Single Event Listener**: A single `click` event listener is attached to this parent `<ul>` element.
    ```javascript
    taskList.addEventListener("click", function (event) {
      // ...
    });
    ```
3.  **Identify Target**: Inside the event listener, `event.target` is used to identify the actual element that was clicked.
4.  **Check if Target is `LI`**: The code checks if the `event.target` is an `<li>` element (i.e., a task item).
    ```javascript
    if (event.target && event.target.nodeName === "LI") {
      // ...
    }
    ```
5.  **Toggle Class**: If the clicked element is an `<li>`, the `.completed` class is toggled on it. This adds or removes the `line-through` style.
    ```javascript
    event.target.classList.toggle("completed");
    ```

### Why Event Delegation?

- **Efficiency**: Only one event listener is attached to the parent element, instead of attaching multiple listeners to each `<li>` child. This is more memory-efficient, especially for long lists.
- **Dynamic Elements**: If new tasks are added to the list dynamically (e.g., via JavaScript after the page loads), the event delegation setup will automatically work for them without needing to attach new event listeners to each new task. The single listener on the parent will catch events bubbling up from new children as well.
