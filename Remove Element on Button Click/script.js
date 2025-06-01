document.addEventListener("DOMContentLoaded", () => {
  const deleteButton = document.getElementById("delete-btn");
  const targetDiv = document.getElementById("target");

  if (deleteButton && targetDiv) {
    deleteButton.addEventListener("click", () => {
      // Remove the target div from the DOM
      targetDiv.remove();
      console.log("Element #target removed.");

      // Optional: Disable the button after removing the element
      // to prevent errors if clicked again or to provide user feedback.
      deleteButton.disabled = true;
      deleteButton.textContent = "Deleted!";
    });
  } else {
    if (!deleteButton) {
      console.error('Button with ID "delete-btn" not found.');
    }
    if (!targetDiv) {
      console.error('Div with ID "target" not found.');
    }
  }
});
