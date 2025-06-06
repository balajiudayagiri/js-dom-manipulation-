// Get references to the DOM elements
const itemInput = document.getElementById("item");
const addItemButton = document.getElementById("add-item");
const itemList = document.getElementById("item-list");

// Add an event listener to the button
addItemButton.addEventListener("click", () => {
  // Get the value from the input field
  const itemText = itemInput.value;

  // Check if the input is not empty (after trimming whitespace)
  if (itemText.trim() !== "") {
    // Create a new list item element
    const newItem = document.createElement("li");

    // Set the text content of the new list item
    // Using textContent is safer as it prevents XSS from user input
    newItem.textContent = itemText;

    // Append the new list item to the unordered list
    itemList.appendChild(newItem);

    // Clear the input field after adding the item
    itemInput.value = "";

    // Optionally, set focus back to the input field for better UX
    itemInput.focus();
  } else {
    // Optionally, provide feedback if the input is empty
    // You could also display this message in a more user-friendly way on the page
    alert("Please enter an item!");
    itemInput.focus(); // Focus back even if empty, so user can type
  }
});

// Optional: Allow adding item by pressing "Enter" in the input field
itemInput.addEventListener("keypress", (event) => {
  // Check if the key pressed was 'Enter'
  if (event.key === "Enter" || event.keyCode === 13) {
    // keyCode for older browsers
    event.preventDefault(); // Prevent default form submission if it were in a form
    addItemButton.click(); // Programmatically click the "Add" button
  }
});
