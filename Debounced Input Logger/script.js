document.addEventListener("DOMContentLoaded", () => {
  const searchBox = document.getElementById("search-box");
  let debounceTimeout;
  const debounceDelay = 1000; // 1000 milliseconds

  if (searchBox) {
    searchBox.addEventListener("input", (event) => {
      // Clear the previous timeout if it exists
      clearTimeout(debounceTimeout);

      // Get the current value from the input field
      const value = event.target.value;

      // Set a new timeout
      debounceTimeout = setTimeout(() => {
        console.log("Input value:", value);
      }, debounceDelay);
    });
  } else {
    console.error('Input element with ID "search-box" not found.');
  }
});
