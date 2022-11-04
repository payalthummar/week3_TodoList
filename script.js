const text = document.getElementById("text");
const addTaskButton = document.getElementById("add-task-btn");
const saveTaskButton = document.getElementById("save-todo-btn");
const listBox = document.getElementById("listBox");
const saveInd = document.getElementById("saveIndex");
let todoArray = [];

addTaskButton.addEventListener("click", (e) => {
    e.preventDefault();
    let todo = localStorage.getItem("todo");
    if (todo === null) {
        todoArray = [];

    } else {
        todoArray = JSON.parse(todo);
    }

    if (!text.value) {
        alert("Please Add a Note")

    } else {
        todoArray.push(text.value);
        text.value = "";
        localStorage.setItem("todo", JSON.stringify(todoArray));
        displayTodo();
    }


});

function displayTodo() {
    let todo = localStorage.getItem("todo");
    if (todo === null) {
        todoArray = [];

    } else {
        todoArray = JSON.parse(todo);
    }
    let htmlCode = "";
    todoArray.forEach((list, ind) => {
        htmlCode += `<div class='flex mb-4 items-center'>
		  <p>${list}</p>
		  <button onclick='edit(${ind})' class="btn btn-success btn-sm rounded-0" type="button" data-toggle="tooltip" data-placement="top" title="Edit"><i class="fa fa-edit"></i></button>
		  <button onclick='deleteTodo(${ind})' class="btn btn-danger btn-sm rounded-0" type="button" data-toggle="tooltip" data-placement="top" title="Delete"><i class="fa fa-trash"></i></button>
		  
	   </div>`;
    });
    listBox.innerHTML = htmlCode;
}

function deleteTodo(ind) {
    let todo = localStorage.getItem("todo");
    todoArray = JSON.parse(todo);
    todoArray.splice(ind, 1);
    localStorage.setItem("todo", JSON.stringify(todoArray));
    displayTodo();
}

function edit(ind) {
    saveInd.value = ind;
    let todo = localStorage.getItem("todo");
    todoArray = JSON.parse(todo);
    text.value = todoArray[ind];
    addTaskButton.style.display = "none";
    saveTaskButton.style.display = "block";
}
saveTaskButton.addEventListener("click", () => {
    let todo = localStorage.getItem("todo");
    todoArray = JSON.parse(todo);
    let id = saveInd.value;
    todoArray[id] = text.value;
    addTaskButton.style.display = "block";
    saveTaskButton.style.display = "none";
    text.value = "";
    localStorage.setItem("todo", JSON.stringify(todoArray));
    displayTodo();
});