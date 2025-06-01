document.addEventListener("DOMContentLoaded", function () {
  const taskList = document.getElementById("tasks");

  if (taskList) {
    taskList.addEventListener("click", function (event) {
      // Check if the clicked element is an LI
      if (event.target && event.target.nodeName === "LI") {
        // Toggle the 'completed' class on the clicked LI
        event.target.classList.toggle("completed");
      }
    });
  } else {
    console.error('Task list element with ID "tasks" not found.');
  }
});
