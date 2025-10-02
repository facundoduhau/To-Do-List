document.addEventListener("DOMContentLoaded", ()=>{
    const taskList = document.getElementById('app-list')
    const addTaskButton = document.getElementById('add-item')
    const userInput = document.getElementById('input-item')
    
    let currentList = JSON.parse(localStorage.getItem('list')) || [];
    
    currentList.forEach(task => {
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
    
    function saveTasks(){
        localStorage.setItem('list', JSON.stringify(currentList))
    }
    
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
        
        const deleteButton = domListElement.querySelector('.delete-btn');
        deleteButton.addEventListener("click", ()=>{
            const newTaskList = []
            
            currentList.forEach(thisTask => {
                if (thisTask.id != task.id){
                    newTaskList.push(thisTask)
                }
            });
            
            currentList = newTaskList;
            saveTasks();
            domListElement.remove();
        })
        
        taskList.appendChild(domListElement)
    }
})