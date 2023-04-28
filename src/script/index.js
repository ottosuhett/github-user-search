import { getUser } from "./services/user.js";
import { getRepo } from "./services/repositories.js";
import { user } from "./objects/user.js";
import { screen } from "./objects/screen.js";
import { getEvents } from "./services/events.js";

const button = document.getElementById('btn-search');
const userName = document.getElementById("input-search");

button.addEventListener("click",()=>{
    if(validateEmptyInput(userName))return;
    getUserData(userName.value);
    
})
userName.addEventListener("keyup",(e)=>{
    const key = e.wich || e.keyCode;
    const isKeyEnter = key === 13;
    if (isKeyEnter){
        if(validateEmptyInput(userName))return;
        getUserData(userName.value);
        userName.setAttribute( "value", " ")
    }
})
function validateEmptyInput(){
    if(userName.value.length === 0){
        alert("Type an username");
        return true;
    }
}
async function getUserData(userName){
    const userResponse = await getUser(userName);
    console.log(userResponse)
    if(userResponse.message === "Not Found"){
        screen.renderNotFound();
        return;
    }
    const repositoriesResponse = await getRepo(userName);
    user.setInfo(userResponse);
    user.setRepositories(repositoriesResponse);
    const eventsResponse = await getEvents(userName);
    user.setEvents(eventsResponse)
    screen.renderUser(user); 
}


