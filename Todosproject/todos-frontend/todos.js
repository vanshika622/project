let taskList = [];

// get tasklist from localstorage
function gettaskListitems() {
  let previoustaskList = localStorage.getItem("taskList");
  if (previoustaskList) return JSON.parse(previoustaskList);
  return [];
}
// fetch item from textbox
function additems(e) {
  // e.preventDefault();
  let text_box = document.getElementById("#text_box");
  console.log(text_box);
  let previoustask = gettaskListitems();
  if (e.key == "Enter") {
    let text_value = text_box.value;
    console.log(text_value);
  }
}
function settaskToLocalStorage(task) {
  localStorage.setItem("taskList", JSON.stringify(task));
}
function gettaskIndexFromtaskList(taskList, task) {
  return taskList.findIndex((tl) => {
    return tl.task === task;
  });
}
function isinTaskList(task) {
  let todoList = gettaskListitems();
  return gettaskIndexFromtaskList(todoList, task);
}
function additems(e) {
  let taskList = gettaskListitems();
  e.preventDefault();

  if (e.key == "Enter") {
    let text_value = text_box.value;
    let trimtask = text_value.trim();

    if (text_value) {
      if (isinTaskList(text_value)!=-1) {
        alert("This Task is already in your todo.....");
      } else {
        const d = new Date();
        let previoustask = gettaskListitems();
        // console.log(previoustask);
        const taskobj = {
          task: trimtask,
          id: d.getSeconds(),
        };
        //   tasksarray.push(taskobj);
        if (previoustask.length > 0) {
          tasksarray = [...previoustask, taskobj];
        } else {
          tasksarray = [taskobj];
        }
        settaskToLocalStorage(tasksarray);
      }
      text_box.value="";
    }
    populatetask();
  }
}
text_box.addEventListener("keyup", additems);

function checkedbutton(e, index) {
  if (e.checked) {
    let text = e.parentElement.children[0];
    text.classList.add("checked");
  } else {
    let text = e.parentElement.children[0];
    text.classList.remove("checked");
  }
}
function removetask(e, index) {
  let todoList = gettaskListitems();
  //console.log(todoList)
  let parentEle = e.parentElement;
  if (index > -1) {
    todoList.splice(index, 1);
  }
  //console.log(todoList)
  settaskToLocalStorage(todoList);
  parentEle.style.display = "none";
}
// function updateinput(e, index){
//     //console.log(index)
//     let todoList =gettaskListitems();
//     e.preventDefault();
//     if(e.key=="Enter"){

//     }
// }
function edittask(e, index) {
  let parentEle = e.parentElement;
  let text = parentEle.children[0];
  //let textid= text.id;
  let newinput = document.createElement("input");
  newinput.className = "editedinput";
  newinput.setAttribute("id", index);
  parentEle.replaceChild(newinput, text);

  newinput.addEventListener("keyup", function (e) {
    let todoList = gettaskListitems();
    e.preventDefault();
    
    if (e.key == "Enter") {
      let newtextvalue = e.target.value;
      
      let todoItems = gettaskListitems();
      if(isinTaskList(todoItems, newtextvalue)!=-1){
        alert("This Task is already in your to do list.... ")
      }
      else{
      let idxofnewtext = e.target.getAttribute("id");
      
      todoItems[idxofnewtext].task = newtextvalue;
      //   console.log(newtextvalue)
      console.log(todoItems[idxofnewtext]);
      settaskToLocalStorage(todoItems);
      populatetask();
      }
    }
  });
}

function populatetask() {
  let todos = gettaskListitems();

  let TodoContainer = document.querySelector("#ToDo_container");

  let elem = "";
  if (todos.length > 0) {
    todos.forEach((todositem, index) => {
      const { task, id } = todositem;
      elem += `<li class="tasks">
                          <span class="todos item" id="todoid-${id}">${task}</span>
                          <input type="hidden" class="saveindex"/>
                        <input type="checkbox"  class="check_box item " id="check_box" onclick="checkedbutton(this,${index})">
                        <i class="fa-solid fa-xmark cross_icon item" onclick="removetask(this,${index})"></i>
                         <i class="fa-solid fa-pen-to-square edit_icon item" id="edit-btn" onclick="edittask(this, ${index})" ></i>
                         </li>`;
    });

    list_box.innerHTML = elem;
  }
}
