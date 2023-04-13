let task = JSON.parse(tasks);
function createHTML() {
  document.getElementById("ToDo").innerHTML = "";
  for (let val of task) {
    let prio = 0;
    if (val.priority >= 0 && val.priority <= 1) { prio = "success" };
    if (val.priority >= 2 && val.priority <= 3) { prio = "warning" };
    if (val.priority >= 4 && val.priority <= 5) { prio = "danger" };
    document.getElementById("ToDo").innerHTML += `
    <div>
      <div class="card p-3 mb-5"> <!-- I prefer not to use h-100 for the same high for all of the cards -->
        <hgroup class="row">
          <p class="col-4 p-2 ms-3 btn btn-info btn-sm w-25 text-white">Task</p>
          <p class="col-8 fs-6 text-end pt-1"><i class="bi bi-bookmark"></i> <i class="bi bi-three-dots-vertical"></i> </p>
        </hgroup>
        <img src="${val.image}" class="card-img-top" alt="${val.shortDescription}">
        <div class="card-body">
          <h5 class="card-title text-center">${val.taskName}</h5>
          <p class="card-text text-center">${val.details}</p>
          <hr>
          <p>
            <a class="btn btn-sm btn-light ImportanceButton">
              <i class="bi bi-exclamation-triangle-fill"></i> Priority level
            </a>
            <span class="btn btn-sm btn btn-${prio} priority"> ${val.priority}</span>
          </p>
          <p><i class="bi bi-calendar-week"></i> Deadline: ${val.deadline}</p>
        </div>
        <div class="card-footer text-end">
          <a href="#" class="btn btn-sm btn-danger"><i class="bi bi-trash-fill"></i> Delete</a>
          <a href="#" class="btn btn-sm btn-success"><i class="bi bi-check-circle"></i> Done</a>
      </div>
    </div>`;
  }
}
createHTML();
function prioColor() {
  let btnimpo = document.getElementsByClassName("ImportanceButton");
  for (let i = 0; i < btnimpo.length; i++) {
    btnimpo[i].addEventListener("click", function () {
      task[i].priority++;
      if (task[i].priority > 5) { task[i].priority = 0 }; // resets the priority to 0 as 5 is the maximum
      if (task[i].priority >= 0 && task[i].priority <= 1) { prio = "success" };
      if (task[i].priority >= 2 && task[i].priority <= 3) { prio = "warning" };
      if (task[i].priority >= 4 && task[i].priority <= 5) { prio = "danger" };
      document.getElementsByClassName("priority")[i].innerHTML = `<a class="btn btn-${prio} btn-sm">` + task[i].priority + `</a>`;
      document.getElementsByClassName("priority")[i].classList.remove("btn-success");
    })
  }
}
prioColor()
let sort = document.getElementById("sort").addEventListener("click", function () {
  task = task.sort(function (a, b) {
    let x = a.priority;
    let y = b.priority;
    return x - y;
  });

  console.table(task.reverse());

  createHTML()
  prioColor()

})