//Declaration of variables
let toDoList = [];
let id = 0;
let data = localStorage.getItem("TODO"); //Read and store complete ToDoList from Local Storage unit by retrieving it with associated key

//Declaration of selection of elements
const clear = document.querySelector(".clear"); //Select Clear button
const dateElement = document.getElementById("date"); 
const list = document.getElementById("list");
const input = document.getElementById("input");
const addButton = document.getElementById("addButton");

//Declaration of names of classes
const CHECK = "fa-check-circle";
const UNCHECK = "fa-circle-thin";
const LINE_THROUGH = "lineThrough";

//Declaration of date parameters and object
const options = {weekday:"long", month:"short", day:"numeric"};
const today = new Date();

/***************************************************************/
/*Helper functions*/
//Add to-do function, appears to do on list
function addToDo(toDo, id, done, trash){
    if(trash){
        return;
    }


    const CHECK_MARK = done ? CHECK : UNCHECK;
    const LINE_MARK = done ? LINE_THROUGH : "";
    const item = `<li class="item">
                    <i class="fa ${CHECK_MARK} co" job="complete" id="${id}"></i>
                    <p class="text ${LINE_MARK}">${toDo}</p> 
                    <i class="fa fa-trash-o de" job="delete" id="${id}"></i>
                 </li>`
    ;
    const position = "afterbegin";

    list.insertAdjacentHTML(position, item);
}

//Complete to-do function, marks as Complete on the list
function completeToDo(element){
    element.classList.toggle(CHECK);
    element.classList.toggle(UNCHECK);
    element.parentNode.querySelector(".text").classList.toggle(LINE_THROUGH);

    toDoList[element.id].done = toDoList[element.id].done ? false : true;
}

//Remove to-do function, disappears To Do from the list
function removeToDo(element){
    element.parentNode.parentNode.removeChild(element.parentNode);

    toDoList[element.id].trash = true;
}

function loadToDoList(array){
    array.forEach(function(item){
        addToDo(item.name, item.id, item.done, item.trash);
    });

}
/* End of Helper functions */
/***************************************************************/

//Show Today´s date
dateElement.innerHTML = today.toLocaleDateString("en-US", options);

//Populate List into Interface
if(data){
    toDoList = JSON.parse(data);    
    id = toDoList.length;
    loadToDoList(toDoList); //Loads list form Local Storage to Interface
}

//clear Local Storage
clear.addEventListener("click", function(){
    localStorage.clear();
    location.reload();
});

//Add item to the list by pressing Enter key
document.addEventListener("keyup", function(even){
    if(event.keyCode == 13){
        const toDo = input.value;
        if(toDo){
            addToDo(toDo, id, false, false);
            toDoList.push({
                name: toDo,
                id: id,
                done: false,
                trash: false
            });            
            id++;
            input.value = "";
            //Sets complete updated ToDoList to Local Storage unit with a key attached to it
            localStorage.setItem("TODO", JSON.stringify(toDoList));
        }
    }    
});

//Add item to the list by pressing plus circle icon (add Button)
addButton.addEventListener("click", function(event){
    const toDo = input.value;
    if(toDo){
        addToDo(toDo, id, false, false);
        toDoList.push({
            name: toDo,
            id: id,
            done: false,
            trash: false
        });            
        id++;
        input.value = "";
        //Sets complete updated ToDoList to Local Storage unit with a key attached to it
        localStorage.setItem("TODO", JSON.stringify(toDoList));
    }
});

//Target the items created dynamically
list.addEventListener("click", function(event){
    const elementClicked = event.target; //return clicked element inside list
    const elementJob = elementClicked.attributes.job.value; //defines as complete or delete

    if(elementJob == "delete"){
        removeToDo(elementClicked);
    }
    else if(elementJob == "complete"){
        completeToDo(elementClicked);
    }
    //Sets complete updated ToDoList to Local Storage unit with a key attached to it
    localStorage.setItem("TODO", JSON.stringify(toDoList));
});