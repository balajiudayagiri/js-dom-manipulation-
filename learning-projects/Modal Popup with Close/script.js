document.addEventListener("DOMContentLoaded", () => {
  // Get references to the DOM elements
  const showModalButton = document.getElementById("show-modal");
  const closeModalButton = document.getElementById("close-modal");
  const modal = document.getElementById("modal");

  // Check if all necessary elements exist to prevent errors
  if (showModalButton && closeModalButton && modal) {
    // Event listener to show the modal
    showModalButton.addEventListener("click", () => {
      // Change display from 'none' to 'flex' to show and center it (as per .modal-overlay CSS)
      modal.style.display = "flex";
    });

    // Event listener to close the modal
    closeModalButton.addEventListener("click", () => {
      modal.style.display = "none";
    });

    // Optional: Close modal if user clicks on the overlay (outside the modal content box)
    modal.addEventListener("click", (event) => {
      // If the clicked target is the modal overlay itself (not its children)
      if (event.target === modal) {
        modal.style.display = "none";
      }
    });
  } else {
    console.error(
      "One or more modal elements were not found. Please check your HTML IDs."
    );
  }
});
