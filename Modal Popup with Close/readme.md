# Modal Popup with Close

A simple web application that demonstrates how to show and hide a modal dialog using vanilla JavaScript.

## 🌟 Features

- **Show Modal**: A button to display the modal overlay and its content.
- **Close Modal**: A button within the modal to hide it.
- **Close on Overlay Click**: The modal also closes if the user clicks on the semi-transparent overlay area outside the modal content box.
- **Basic Styling**: CSS is used to style the modal, making it appear as an overlay with centered content.
- **DOM Manipulation**: Uses JavaScript to toggle the visibility of the modal.

## 📂 File Structure

```
.
├── index.html       # The main HTML structure including the modal
├── style.css        # CSS styles for the page and modal
└── script.js        # JavaScript logic for showing/hiding the modal
```

## 💡 How It Works

- **`index.html`**:

  - Contains a `<button id="show-modal">` to trigger the modal.
  - Defines the modal structure:
    - An outer `<div id="modal">` (styled as an overlay), initially hidden using an inline `style="display:none;"`.
    - An inner `<div id="modal-content">` (styled as the dialog box) which holds the modal's text and a `<button id="close-modal">`.

- **`style.css`**:

  - Styles the main page content for context.
  - Styles the `#show-modal` button.
  - The `.modal-overlay` class (applied to `<div id="modal">`) styles it as a full-screen fixed overlay with a semi-transparent background. It uses `display: flex` to center its child.
  - The `.modal-dialog` class (applied to `<div id="modal-content">`) styles the actual content box of the modal.
  - The `#close-modal` button is also styled.

- **`script.js`**:
  1.  Waits for the DOM to be fully loaded using `DOMContentLoaded`.
  2.  Gets references to the "Show Modal" button, the "Close" button (inside the modal), and the modal `div` itself using their IDs.
  3.  **Show Modal Logic**: An event listener is attached to the "Show Modal" button. When clicked, it changes the `display` style of the modal `div` from `none` to `flex`, making it visible. `flex` is used here to enable the centering defined in CSS for `.modal-overlay`.
  4.  **Close Modal Logic**: An event listener is attached to the "Close" button. When clicked, it changes the `display` style of the modal `div` back to `none`, hiding it.
  5.  **Overlay Click to Close**: An event listener is attached to the modal overlay itself. If a click occurs directly on the overlay (and not on its children like the modal content box), the modal's `display` style is set to `none`.

This project demonstrates a fundamental UI pattern using basic HTML, CSS, and JavaScript DOM manipulation.
