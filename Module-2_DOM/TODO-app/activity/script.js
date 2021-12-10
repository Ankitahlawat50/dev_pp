let todoinput=document.querySelector(".todo-input");
let addBtn=document.querySelector(".todo-add");
let todolist=document.querySelector(".todo-list");

function addtodo(){
    let val=todoinput.value;
   // console.log(val);
   if(val){
       let li=document.createElement("li");
       li.classList.add("todo-item");

       let p=document.createElement("p");
       p.classList.add("todo");
       p.innerHTML=val;

       let delButton=document.createElement("button");
       delButton.classList.add("todo-delete");
       delButton.innerHTML="DELETE";

       //to delete the element=>many ways
       delButton.addEventListener("click",function(event){
            console.log("delete " + val);
            let liDelete=delButton.parentElement;
            liDelete.remove();
        //  liDelete.parentElement.removeChild(liDelete);
        //  event.target.parentNode.remove();
       });

       li.append(p);
       li.append(delButton);

       todolist.append(li);

   }

    todoinput.value="";
}

addBtn.addEventListener("click", function(){
    addtodo();
});


todoinput.addEventListener("keypress", function(event){
    //console.log(event);
    if(event.key=="Enter"){
        //console.log("enter pressed");
        addtodo();
    }
});