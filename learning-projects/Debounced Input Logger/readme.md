# Debounced Input Logger

This project demonstrates how to implement a debounced input field using JavaScript. When a user types into the input field, the value is logged to the browser's console only after a specified delay (500ms) since the last keystroke. This is useful for scenarios like auto-suggest search boxes where you want to avoid making an API call on every single keystroke.

## 🌟 Features

- Input field that logs its value to the console.
- Debouncing mechanism to delay logging until the user stops typing for 500ms.
- Simple HTML, CSS, and JavaScript implementation.
- Clear visual feedback and instructions on the page.

## 🛠️ Technologies Used

- HTML5
- CSS3
- JavaScript (ES6+)

## 🚀 Setup and Usage

1.  **Ensure you have the files:**
    Place the following files in the same directory (e.g., `debounced-input-logger`):

    - `index.html`
    - `style.css`
    - `script.js`

2.  **Open `index.html` in your web browser.**
    You will see an input field and a message.

3.  **Type into the input field.**
    Open your browser's developer console (usually by pressing F12 or right-clicking and selecting "Inspect" then navigating to the "Console" tab). You will see the input's value logged after you stop typing for 500 milliseconds. Each new keystroke within the 500ms window will reset the timer.

## 📂 File Structure

```
debounced-input-logger/
├── index.html       # The main HTML structure with the input field
├── style.css        # CSS styles for the page and input field
└── script.js        # JavaScript code for the debouncing logic
```

## 💡 How It Works

### HTML (`index.html`)

The HTML provides a basic structure with an input field having the ID `search-box` and some informational text.

```html
<input id="search-box" placeholder="Type here..." />
```

### CSS (`style.css`)

The CSS provides basic styling for the page and the input field to make it visually presentable and user-friendly.

### JavaScript (`script.js`) - Debouncing

The core logic resides in `script.js`:

1.  **Get Input Element**: It selects the input field with the ID `search-box`.
    ```javascript
    const searchBox = document.getElementById("search-box");
    ```
2.  **Initialize Variables**:
    - `debounceTimeout`: Stores the ID of the `setTimeout` timer. This allows us to clear it if the user types again before the delay has passed.
    - `debounceDelay`: The delay in milliseconds (500ms) before the function is executed.
    ```javascript
    let debounceTimeout;
    const debounceDelay = 500;
    ```
3.  **Event Listener**: An `input` event listener is attached to the `searchBox`. The `input` event fires every time the value of the `<input>` element changes (including pasting, cutting, etc.).
    ```javascript
    searchBox.addEventListener("input", (event) => {
      // ...
    });
    ```
4.  **Debounce Logic**:
    - **Clear Previous Timeout**: Inside the event listener, `clearTimeout(debounceTimeout)` is called. If there was a previously scheduled log (because the user typed recently), this cancels it.
    - **Get Current Value**: The current value of the input is retrieved using `event.target.value`.
    - **Set New Timeout**: A new `setTimeout` is scheduled. The function inside `setTimeout` (which logs the value) will only execute if `debounceDelay` (500ms) passes without another `input` event clearing this timeout.
    ```javascript
    clearTimeout(debounceTimeout);
    const value = event.target.value;
    debounceTimeout = setTimeout(() => {
      console.log("Input value:", value);
    }, debounceDelay);
    ```

This mechanism ensures that `console.log` is only called once after the user has paused typing for the specified duration, making it efficient for tasks that shouldn't run on every single keystroke.
