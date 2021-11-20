const inputbox = document.querySelector(".inputbox input");
const addbtn = document.querySelector(".inputbox button");
const todolist = document.querySelector(".todolist");

inputbox.onkeyup = () =>{
    let userdata = inputbox.value; //getting user enterd value
    if(userdata.trim() !=0){ //if user enters no data
        addbtn.classList.add("active");
    }
    else{
        addbtn.classList.remove("active");
    }
}
showlist(); //always showitems even refreshed


//if button clicked
addbtn.onclick = () =>{
    let userdata = inputbox.value;
    let getLocalStorage = localStorage.getItem("new todo"); //get local storage in browser
    if(getLocalStorage == null){ //if localstorage null only
        listarr = []; //createblankarray
    }
    else{
        listarr = JSON.parse(getLocalStorage); //if not null 
    }
    listarr.push(userdata); //pushing user data into list
    localStorage.setItem("new todo", JSON.stringify(listarr)); //converting js obj into js string
    showlist(); //calling to show new list tags 
    addbtn.classList.remove("active");
}


function showlist(){
    let getLocalStorage = localStorage.getItem("new todo"); //get local storage in browser
    if(getLocalStorage == null){ //if localstorage null only
        listarr = []; //createblankarray
    }
    else{
        listarr = JSON.parse(getLocalStorage); //if not null 
    }
    const pendingtasks = document.querySelector(".pendingtasks");
    pendingtasks.textContent = listarr.length; // length of no of list
    
    let newlitag = " ";
    listarr.forEach((element,index) => {
        newlitag += `<li>${element}<span class="icon" onclick="deletelist(${index})";><i class="fas fa-trash"></i></span></li>`;
    });

    todolist.innerHTML = newlitag; //addnew li tag into page 
    inputbox.value = ""; //keep input text empty after every input taken
}

//delete function through clicking delete trash icon
function deletelist(index){
    //let getLocalStorage = localStorage.getItem("new todo");
    //listarr = JSON.parse(getLocalStorage);
    listarr.splice(index, 1); // delete and add remaing list elements
    localStorage.setItem("new todo", JSON.stringify(listarr));
    showlist();
}

 //clearall function
const clearall = document.querySelector(".footer button");
clearall.onclick = () =>{
    listarr = [];
    localStorage.setItem("new todo", JSON.stringify(listarr));
    showlist();
}
