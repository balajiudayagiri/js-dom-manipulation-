# Remove Element on Button Click

This project demonstrates a simple DOM manipulation technique: removing an HTML element from the page when a button is clicked.

## 🌟 Features

- A designated `div` element that can be removed.
- A "Delete" button that triggers the removal.
- Visual feedback after the element is removed (button text changes and becomes disabled).
- Uses vanilla JavaScript for DOM manipulation.

## 🛠️ Technologies Used

- HTML5
- CSS3
- JavaScript (ES6+)

## 🚀 Setup and Usage

1.  **Ensure you have the files:**
    Place the following files in the same directory (e.g., `remove-element-on-click`):

    - `index.html`
    - `style.css`
    - `script.js`

2.  **Open `index.html` in your web browser.**
    You will see a blue box with text and a "Delete" button below it.

3.  **Click the "Delete" button.**
    The blue box will disappear from the page, and the button will change its text to "Deleted!" and become disabled. Check the browser's console for a confirmation message.

## 📂 File Structure

```
remove-element-on-click/
├── index.html       # The main HTML structure with the target div and button
├── style.css        # CSS styles for the page elements
└── script.js        # JavaScript code for the removal logic
```

## 💡 How It Works

### HTML (`index.html`)

The HTML sets up a `div` with the ID `target` (which is the element to be removed) and a `button` with the ID `delete-btn`.

```html
<div id="target">This is removable</div>
<button id="delete-btn">Delete</button>
```

### CSS (`style.css`)

The CSS provides basic styling to make the `div` and button visually distinct and to improve the user experience (e.g., hover effects, layout).

### JavaScript (`script.js`)

The JavaScript code handles the removal logic:

1.  **Wait for DOM Load**: The script waits for the `DOMContentLoaded` event to ensure all HTML elements are available.
    ```javascript
    document.addEventListener("DOMContentLoaded", () => {
      // ...
    });
    ```
2.  **Get Elements**: It gets references to the button and the target `div` using their respective IDs.
    ```javascript
    const deleteButton = document.getElementById("delete-btn");
    const targetDiv = document.getElementById("target");
    ```
3.  **Add Event Listener**: A `click` event listener is attached to the `deleteButton`.
    ```javascript
    if (deleteButton && targetDiv) {
      deleteButton.addEventListener("click", () => {
        // ... removal logic ...
      });
    }
    ```
4.  **Remove Element**: When the button is clicked, the `targetDiv.remove()` method is called. This method directly removes the `targetDiv` node from the DOM tree.
    ```javascript
    targetDiv.remove();
    ```
5.  **Provide Feedback (Optional but Recommended)**: After removing the element, the button's `disabled` property is set to `true` to prevent further clicks, and its text content is updated to "Deleted!" to inform the user of the action's completion.
    `javascript
    deleteButton.disabled = true;
    deleteButton.textContent = 'Deleted!';
    `
    This provides a clean and straightforward way to dynamically alter the content of a webpage based on user interaction.
