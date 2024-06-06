// this one is variable for input form where user will add the elements
let todoInput = document.querySelector(".input");

// this one is variable for input add button form where user added elements will
// be added to the webpage on clicking add button
let addTodoButton = document.querySelector(".button");

// for showing the elements on the website
let showTodos = document.querySelector(".todos-container");

// to fetch the data declaring a variable for storing it
let todo;

// array to save the added data
// let todoList = [];


let localData = JSON.parse(localStorage.getItem("todos"));
let todoList = localData || [];

// function for creating unique ids for the data added  by the user
// this function generates a UUID (Universally Unique Identifier), specifically a version 4 UUID
// the UUID is a 128-bit number used to uniquely identify information in computer systems
function uuid() {
    // The template for a version 4 UUID. 'x' will be replaced with random hex digits,
    // and 'y' will be replaced with a random hex digit from 8 to b (inclusive).
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        // Generate a random number between 0 and 15 (inclusive)
        var r = Math.random() * 16 | 0;
        // If the current character is 'x', use the random number 'r'
        // If the current character is 'y', use the random number 'r' but force some bits:
        // - (r & 0x3) masks the last two bits of 'r' to 0 (resulting in 0000 to 0011 in binary)
        // - 0x8 adds 8 to the masked result (resulting in 1000 to 1011 in binary, or 8 to b in hex)
        var v = c == 'x' ? r : (r & 0x3 | 0x8);
        // Convert the value to a hexadecimal string and return it
        return v.toString(16);
    });
}


// adding what add button would do when clicked
addTodoButton.addEventListener("click", (e) => {
	e.preventDefault(); // prevents the reloading of page that happens when we clicked the button as 
	// we are using form it causes the reloading of the page and we dont want that to happen
	// storing the data upladed by the user
	todo = todoInput.value;
	// for our debugging that data is fetched
	console.log(todo);
	
    if (todo.length > 0) {
        todoList.push({
			// added element
            todo,
			// unique id genertion
            id: uuid(),
	
			// only when button pressed
            isCompleted: false
        });
        renderTodoList(todoList);
        localStorage.setItem("todos", JSON.stringify(todoList));
        todoInput.value = "";
	}
})


showTodos.addEventListener("click", (e) => {
    e.preventDefault();
    let key = e.target.dataset.key;
    let delTodoKey = e.target.dataset.todokey;
    todoList = todoList.map((todo) =>
        todo.id === key ? {
            ...todo,
            isCompleted: !todo.isCompleted
        } : todo
    );
    todoList = todoList.filter((todo) => todo.id !== delTodoKey);
    localStorage.setItem("todos", JSON.stringify(todoList));
    console.log(todoList);
    renderTodoList(todoList);
});

function renderTodoList(todoList) {
    showTodos.innerHTML = todoList.map(
        ({
            todo,
            id,
            isCompleted
        }) =>
        `<div class="todo relative"> <input id="item-${id}" data-key=${id} class="t-checkbox t-pointer" type="checkbox" ${
        isCompleted ? "checked" : ""
      }> <label data-key=${id} class="todo-text t-pointer ${
        isCompleted ? "checked-todo" : ""
      }" for="item-${id}"> ${todo} </label> <button class="absolute right-0 button cursor">
      <span data-todokey=${id}  class="del-btn material-icons-outlined">delete</span>
            </button> </div>`
    );
}

renderTodoList(todoList);

