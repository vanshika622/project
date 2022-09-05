let Alltodos=[];
function getdata(){
    fetch("http://localhost:8080/todos",{
        method:'GET'
    })
    .then((res)=>res.json())
    .then((todos)=>{
        
    Alltodos = todos;
      displaydata(Alltodos);
    })
    .catch((err)=>{
        console.log(err)
    })
}
getdata();
function addData(){
   let todos={};
   todos.id= Number(document.getElementById("task_Id").value);
   todos.task=document.getElementById("text_box").value;
     todos.completed=false;
   fetch("http://localhost:8080/todos",{
    method:"POST",
    body:JSON.stringify(todos),
    headers:{
        "Content-Type":"application/json"
    }
   })
   .then((res)=>res.json())
   .then((msg)=>{
         Alltodos.push(todos);
         displaydata(Alltodos);
   })
   .catch((err)=>{
    console.log(err);
   })
   document.getElementById("task_Id").value=0;
   document.getElementById("text_box").value=""

}
function displaydata(Alltodos){
    //debugger;
    document.getElementById("list_box").innerHTML="";
    Alltodos.sort((a,b)=>a.id-b.id)
    
    let elem="";
    Alltodos.forEach((todo,index)=>{
        elem+=`<tr>
        <td  class="Id">${todo.id}</td>
        <td class="todo" id="text">${todo.task}</td>
        <td class="action">
           <i class="fa-solid fa-circle-check check_box" id="checkbox" onclick="completedtask(${todo.id},this)"></i>
           <i class="fa-solid fa-file-pen updatedIcon text-primary"></i>
           <i class="fa-solid fa-trash deleteicon text-danger" onclick="deletetodo(${todo.id})"></i>
        </td>
      </tr> `
      document.getElementById("list_box").innerHTML=elem;
      
    })
   

}

function deletetodo(id){
    fetch("http://localhost:8080/todos?id="+id,{
        method:"DELETE"
    })
    .then((res)=>res.json())
    .then((msg)=>{
        if(msg.success===true){
            let indextodeleted= Alltodos.findIndex((todo,idx)=>{
                return Number(todo.id)===Number(id);
            })
            Alltodos.splice(indextodeleted,1);
            console.log(Alltodos);
            displaydata(Alltodos);
        }
    })
    .catch((err)=>{
        console.log(err)
    })
}

function completedtask(id,e){
    
   let indexupdated= Alltodos.findIndex((ele, idx)=>{
         return Number(ele.id)===Number(id)
    })
    let todo=  Alltodos[indexupdated];
    todo.completed=true;
   
       console.log(todo);
    fetch("http://localhost:8080/todos?id="+id,{
        method:"PUT",
        body:JSON.stringify(todo),
        headers:{
            "Content-Type":"application/json"
        }
    })
    .then((res)=>res.json())
    .then((msg)=>{
        if(msg.success===true){
               let todoupdated= Alltodos.findIndex((ele,idx)=>{
                return Number(ele.id)===Number(id);
               })
               Alltodos[todoupdated]=todo;
              displaydata(Alltodos)
              checkedmark(e);
        }
    })
    .catch((err)=>{
        console.log(err)
    })
}

function checkedmark(e){
    let td=e.parentElement
    console.log(td.parentElement.children[1])
    if (e.clicked) {
        let text = td.parentElement.children[1];
        text.classList.add("checked");
      } else {
        let text = td.parentElement.children[1];
        text.classList.remove("checked");
      }


}