const form=document.getElementById('form');
const username=document.getElementById('username');
const email=document.getElementById('email');
const password=document.getElementById('password');
const password2=document.getElementById('password2');
const github=document.getElementById('github');
const facebook=document.getElementById('facebook');
const twitter=document.getElementById('twitter');
const myFileInput=document.getElementById('myFileInput');
var imgData;
document.querySelector("#myFileInput").addEventListener("change",function(){
    const reader=new FileReader();

    reader.addEventListener("load", ()=>{
        localStorage.setItem("recent-image",reader.result);
    });
    reader.readAsDataURL(this.files[0]);
});

form.addEventListener('submit',e=>{
    e.preventDefault();
     if(validateInputs()){ 
    imgData=localStorage.getItem("recent-image");
    let notes=localStorage.getItem("notes");
    if(notes==null){
        notesObj=[];
    }
    else{
        notesObj=JSON.parse(notes);
    }
    let myObj={
        username: username.value,
        email: email.value,
        password: password.value,
        password2: password2.value,
        github: github.value,
        facebook: facebook.value,
        twitter: twitter.value,
        image:imgData
    }
    notesObj.push(myObj);
    localStorage.setItem("notes",JSON.stringify(notesObj));
    username.value="";
    email.value="";
    password.value="";
    password2.value="";
    github.value="";
    facebook.value="";
    twitter.value="";
    myFileInput.value="";
    displayEmployee();
}
});

//display employee
function displayEmployee(){
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
        <div class="swiper-slide card">
        <div class="card-content">
            <div class="image">
                <img src="${element.image}" alt="image not found">
            </div>
            
            <div class="media-icons">
                <a href="${element.facebook}"> <i class="fab fa-facebook"></i></a>
               <a href="${element.twitter}"><i class="fab fa-twitter"></i></a>
              <a href="${element.github}"><i class="fab fa-github"></i></a>
            </div>

            <div class="name-profession">
                <span class="name">${element.username}</span>
                <span class="profession">${element.email}</span>
            </div>
            <div class="button">
                <button id="${index}" onclick="editEmployee(this.id)" class="edit">Edit</button>
                <button id="${index}" onclick="deleteEmployee(this.id)" class="delete">Delete</button>
            </div>
        </div>
    </div>
            `;
    });

    let noteElm = document.getElementById("swiper-wrapper");
    if(notesObj.length!=0){
        noteElm.innerHTML=html;
    }
    else{
        noteElm.innerHTML="No Data Yet! Add an employee using the form above";
    }
}
//Delete employee
function deleteEmployee(index){
    let confirmDel=confirm("Are you sure to delete this employee!!!");

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
        displayEmployee();
    }
}

//Edit Employee
function editEmployee(index){
    let notes=localStorage.getItem("notes");
    if(username.value!=="" || email.value!=="" || password.value!=="" || password2.value!=="" || facebook.value!=="" || github.value!=="" ||twitter.value!=="" || myFileInput.value!==""){
        return alert("Please clear the form before editing a note");
    }
    if(notes==null){
        notesObj=[];
    }
    else{
        notesObj=JSON.parse(notes);
    }
    username.value=notesObj[index].username;
    email.value=notesObj[index].email;
    facebook.value=notesObj[index].facebook;
    twitter.value=notesObj[index].twitter;
    github.value=notesObj[index].github;
    notesObj.splice(index,1);
    localStorage.setItem("notes",JSON.stringify(notesObj));
    displayEmployee();
}

const setError=(element,message)=>{
    const inputControl=element.parentElement;
    const errorDispay=inputControl.querySelector('.error');
    errorDispay.innerText=message;
    inputControl.classList.add('error');
    inputControl.classList.remove('success');
}

const setSuccess = element => {
    const inputControl=element.parentElement;
    const errorDispay=inputControl.querySelector('.error');

    errorDispay.innerText='';
    inputControl.classList.add('success');
    inputControl.classList.remove('error');
}

const isValidEmail = email => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

const validateInputs=()=>{
    const usernameValue=username.value.trim();
    const emailValue=email.value.trim();
    const passwordValue=password.value.trim();
    const password2Value=password2.value.trim();
    const facebookValue=facebook.value.trim();
    const twitterValue=twitter.value.trim();
    const githubValue=github.value.trim();
    var flag;
    if(usernameValue === ''){
        setError(username,'Username is required');
         return false;
    }else{
        setSuccess(username);
        flag=1;
    }

    if(emailValue === ''){
        setError(email,'Email is required');
        return false;
    }else if(!isValidEmail(emailValue)){
        setError(email,'Provide a valid email address');
        return false;
    }
    else{
        setSuccess(email);
        flag=1;
    }

    if(passwordValue===''){
        setError(password,'Password is required');
        return false;
    }else if(passwordValue.length<8){
        setError(password,'Password must be at least 8 character.');
        return false;
    }
    else{
        setSuccess(password);
        flag=1;
    }

    if(password2Value===''){
        setError(password2,'Password is required');
        return false;
    }else if(password2Value!== passwordValue){
        setError(password2,"Password doesn't match");
        return false;
    }
    else{
        setSuccess(password2);
        flag=1;
    }
    if(flag===1){
        return true;
    }
}
displayEmployee();