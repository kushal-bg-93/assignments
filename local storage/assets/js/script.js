let addBtn = document.getElementById("add-btn");
let addTitle = document.getElementById("note-title");
let addTxt = document.getElementById("note-text");
addBtn.addEventListener("click",(e)=> {
    if(addTitle.value=="" || addTxt.value==""){
        return alert("Please add note title and details");
    }
    let notes=localStorage.getItem("notes");
    if(notes==null){
        notesObj=[];
    }
    else{
        notesObj=JSON.parse(notes);
    }
    let myObj={
        title: addTitle.value,
        text: addTxt.value
    }
    notesObj.push(myObj);
    localStorage.setItem("notes",JSON.stringify(notesObj));
    addTitle.value="";
    addTxt.value="";

    showNotes();
});

//Show Notes
function showNotes(){
    let notes=localStorage.getItem("notes");
    if(notes==null){
        notesObj=[];
    }
    else{
        notesObj=JSON.parse(notes);
    }

    let html="";
    notesObj.forEach(function(element,index){
        html+=`
        <div id="notes" class="notes">
        <div id="note">
        <p class="note-counter">Note ${index+1}</p>
        <h3 class="note-title">${element.title}</h3>
        <p class="note-text">${element.text}</p>
        <button id="${index}" onclick="deleteNote(this.id)" class="note-btn">Delete</button>
        <button id="${index}" class="note-btn edit-btn" onclick="editNote(this.id)">Edit</button>
    </div>
    </div>
            `;
    });

    let noteElm = document.getElementById("container-det");
    if(notesObj.length!=0){
        noteElm.innerHTML=html;
    }
    else{
        noteElm.innerHTML="No Notes Yet! Add a note using the form above";
    }
}
//Delete notes
function deleteNote(index){
    let confirmDel=confirm("Are you sure to delete this note!!!");

    if(confirmDel==true){
        let notes=localStorage.getItem("notes");
        if(notes==null){
            notesObj=[];
        }
        else{
            notesObj=JSON.parse(notes);
        }
        notesObj.splice(index,1);
        localStorage.setItem("notes",JSON.stringify(notesObj));
        showNotes();
    }
}
//Edit Notes
function editNote(index){
    let notes=localStorage.getItem("notes");
    if(addTitle.value!=="" || addTxt.value!==""){
        return alert("Please clear the form before editing a note");
    }
    // if(notes==null){
    //     notesObj=[];
    // }
    // else{
    //     notesObj=JSON.parse(notes);
    // }
    // console.log(notesObj[index].title);
    // notesObj.findIndex((element,index)=>{
    //     addTitle.value=element.title;
    //     addTxt.value=element.text;
    //     console.log(element.title);
    //     console.log("index is"+index);
    // });
    addTitle.value=notesObj[index].title;
    addTxt.value=notesObj[index].text;
    notesObj.splice(index,1);
    localStorage.setItem("notes",JSON.stringify(notesObj));
    showNotes();
}
showNotes();
