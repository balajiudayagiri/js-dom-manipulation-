/**
 * Represents the theme toggle button element.
 * @type {HTMLElement | null}
 */
const toggleThemeButton = document.getElementById("toggle-theme");

if (toggleThemeButton) {
  /**
   * Adds an event listener to the theme toggle button.
   * When clicked, it toggles the 'dark' class on the body element
   * to switch between light and dark themes.
   * It also logs the action and the current classes of the body to the console.
   *
   * @listens {click} - Listens for a click event on the `toggleThemeButton`.
   */
  toggleThemeButton.addEventListener("click", () => {
    // Toggle the 'dark' class on the body element
    // This will switch between light and dark themes
    // here toggle() is used to add or remove the class based on its current state
    document.body.classList.toggle("dark");
    // Log the current classes of the body element
    console.log("Toggled 'dark' class. Body classes:", document.body.classList);
  });
} else {
  /**
   * Logs an error to the console if the theme toggle button element
   * with the ID "toggle-theme" is not found in the DOM.
   */
  console.error("Toggle theme button not found!");
}
