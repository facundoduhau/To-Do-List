document.addEventListener("DOMContentLoaded", ()=>{
    const taskList = document.getElementById('app-list')
    const addTaskButton = document.getElementById('add-item')
    const userInput = document.getElementById('input-item')

    let currentList = JSON.parse(localStorage.getItem('list')) || []; // What does this even mean?
    // It means it will first try and read local storage strings, and parse it to JSON format
    // If the local Storage is empty, it will then initialize the array with an empty list

    currentList.forEach(task => { // We run a forEach loop to travel all the array and run the render task function on each item
        renderTasks(task)
    });

    addTaskButton.addEventListener("click", ()=>{
        const userText = userInput.value.trim();
        if (userText === ""){
            return;
        };

        const newTask ={
            id: Date.now(),
            text: userText,
            completed: false
        }

        currentList.push(newTask);

        saveTasks();

        renderTasks(newTask);

        userInput.value = "";

        console.log(currentList);
    })

    // I want to save these tasks in the local storage
    // How can I make it so that these objects are saved?
    // We make a function that accesses the local storage API from the browser
    // In this case, it's <localStorage>
    // Yeah... how original

    function saveTasks(){
        localStorage.setItem('list', JSON.stringify(currentList)) // <setItem> PUSHES to local Storage. You need to send a string
    }

    // Now I can add this function to line (24) to save a task to the list of the local Storage API.

    // The thing is, when you reload, or hit (F5), you get the local storage again but...
    // When you add new tasks it rewrites the local storage, meaning, it treats it as an empty array where you can see past items

    // To fix this, we need to read the Local Storage, and render it's contents to the DOM

    // But we want to do this as soon as the web is loading, since we want to add the local Storage items to
    // the array list we have

    // The solution is to wrap everything inside a document event, listening for the DOM loading

function renderTasks(task){
    console.log(task);

    const domListElement = document.createElement('li');
    domListElement.setAttribute('data-id', task.id);
    domListElement.className = 'h-1/10 flex items-center justify-around';

    domListElement.innerHTML = `
        <div class="bg-gray-600 h-full rounded-2xl w-6/8 text-center justify-center items-center flex">
            ${task.text}
        </div>
        <button class="delete-btn w-1/6 rounded-2xl bg-red-500 h-full cursor-pointer">
            Clear
        </button>
    `
    taskList.appendChild(domListElement)
}
})