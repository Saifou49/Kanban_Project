//the name of the new list
var newList;

var newListToLowerCase;

var idBackButton;

var idInputSaveTaskValue;
var idInputSaveTask;
var idSaveButton;
var iDButtonDiv;
var idDivTasks;
var idAddButton;

// This function initialise and update the drag and drop component
function initParam()
{
        /*A variable for all tasks to drag* */
    const draggables = document.querySelectorAll(".task");
    /*A variable for the targets the contaimer where to drop the dragged items* */
    const droppables = document.querySelectorAll(".tasks");

    draggables.forEach((task) => {
        task.addEventListener("dragstart", () => {
            task.classList.add("is-dragging");
        });
        task.addEventListener("dragend", () => {
            task.classList.remove("is-dragging");
        });
    });

    droppables.forEach((zone)=>{
        zone.addEventListener("dragover", (e) => {
            e.preventDefault();
       
            const currentTask = document.querySelector(".is-dragging");
           
            zone.appendChild(currentTask);
        });
    });
}

// Add new tasks list container to the screen
function addNewList()
{
    // generate and create a new unique id starting from 0. This has a page scope, meaning after refreshing the page the id starts from 0 again
    var newId = 'list'+uniqId();
    if($('#add-list').val().trim() == "")
    {
        alert("Please enter a name for the new List");
    }
    else
    {
        // update all the global id variables with the new id value
        loadCurrentListId(newId);
        $(".box-container").append(
            ' <div class="box"> ' +    
            ' <h3> ' + $('#add-list').val().toUpperCase() + ' </h3> ' +
            // '<div class="tasks' + /** + $('#add-list').val() + */ " > ' +
            '<div class="tasks" id= "'+ idDivTasks +'"  > ' + '</div> ' +
            '<div class="div-button " id= "'+ iDButtonDiv +'" > ' +
            '<button id ="'+ idAddButton +'" onclick="showTaskInput(\''+newId+'\')" type="submit"  >+ Add task </button> ' +
            ' </div> '
            +'</div> '
        );

        $('#add-list').val("");
        initParam();// to be able to drag and drop the tasks
    }  

}

// after user clicks on add new task this method is called using the generated id generated in addNewList()
// this peace of code creates the action already adding the id as parametre -> saveNewTask(\''+newId+'\')
// The \' is necessary for scaping as this is inside and string
function showTaskInput(newId){
loadCurrentListId(newId);
var formEntry = '<button id="'+ idSaveButton +'" onclick="saveNewTask(\''+newId+'\')" >Save</button><input type="text" id="'+ idInputSaveTask +'"  value="" > '+
                            '<button id="'+ idBackButton +'" type="submit" onclick="backNewList(\''+newId+'\')" >Back</button>';
                           
    $('#' + iDButtonDiv).append(formEntry);  
                           
    $('#' + idAddButton).hide();
}

// called when the user clicks to add task.
function saveNewTask(newId)
{
// As previously is declared passing a id param, then use it to reload the global id variables
loadCurrentListId(newId);
    idInputSaveTaskValue = $('#'+ idInputSaveTask).val() ;

    if(idInputSaveTaskValue =="")
    {
        alert("Please enter a task to save");
    }
    else
    {
        $('#'+ idDivTasks).append('<div class="task" draggable = "true" > <p contenteditable="true">' + idInputSaveTaskValue.charAt(0).toUpperCase() + idInputSaveTaskValue.slice(1).toLowerCase() + ' </p> </div>')
        //delete the task with double click
        $('.task').dblclick(function() {
            $(this).remove();
        });


        $('#'+idInputSaveTask).val("");
        initParam();// to be able to drag and drop the tasks

    }
   
}

function loadCurrentListId(newId)
{
    iDButtonDiv = newId +'-div-button';
    idAddButton = newId +'-button';
    idDivTasks = newId +'-div';
    idInputSaveTask = newId + '-task-Input';
        idSaveButton = newId + '-save-button';
        idBackButton = newId + '-back-button';
        idAddButton = newId + '-button';
}

function backNewList(newId)
{
    idAddButton = newId + '-button';

    $('#'+ idBackButton + ',' + '#' + idSaveButton + ',' + '#' + idInputSaveTask).remove();
    $('#'+ idAddButton).show();
}





// generate unique idconst uniqId = (() => {
const uniqId = (() => {
    let i = 0;
    return () => {
        return i++;
    }
})();


