const taskList = document.getElementById('app-list')
const addTaskButton = document.getElementById('add-item')
const userInput = document.getElementById('input-item')

let currentList = [];

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

    userInput.value = "";

    console.log(currentList);
})