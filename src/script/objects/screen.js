const screen = {
    userProfile:document.querySelector(".profile-data"),

    renderUser(user){
        this.userProfile.innerHTML = `<div class="info">
                        <img src="${user.avatarUrl}" alt="user avatar"/>
                        <div class="data">
                            <h1 class="name">${user.name ?? "Name didn't found"}</h1>
                            <p class="bio">${user.bio ?? "Bio didn't found"}</p>
                            <p><i class="fa-solid fa-users"></i> Followers ${user.followers}</p>
                            <p><i class="fa-solid fa-user-group"></i> Following: ${user.following} </p>
                        </div>
        `
        let repositoriesItens = "";
        user.repositories.forEach(repo => {
            repositoriesItens += `<li><a href="${repo.html_url}" target = "_blank"</a>
                                            ${repo.name}<br>
                                            <i class="fa-sharp fa-solid fa-code-fork"></i> ${repo.forks_count} 
                                            <i class="fa-sharp fa-solid fa-star"></i> ${repo.stargazers_count}
                                            <i class="fa-sharp fa-solid fa-eye"></i> ${repo.watchers_count}
                                            <i class="fa-sharp fa-solid fa-laptop-code"></i> ${repo.language}
                                            
                                </li>`
        })
        if(user.repositories.length > 0){
            this.userProfile.innerHTML += 
            `<div class="repositories section">
                <h2>Repositories</h2>
                <ul>${repositoriesItens}</ul>
            </div>
            `
        }
        
        let eventsItens = "";
        user.events.forEach(eventItem => {
            if(eventItem.type === "PushEvent" || eventItem.type === "CreateEvent"){
                if(eventItem.type === "PushEvent"){
                    eventItem.payload.commits.forEach(commit =>{
                        eventsItens += `<li>${eventItem.repo.name}: - ${commit.message} </li>`
                    }) 
                }else{
                eventsItens += `<li>${eventItem.repo.name}: - ${eventItem.type} </li>`}     
            }
            
        })

        if(user.events.length > 0){
            this.userProfile.innerHTML += 
            `<div class="events section">
                <h2>Events</h2>
                <ul>${eventsItens}</ul>
            </div>
            `
        }
    },
    renderNotFound(){
        this.userProfile.innerHTML = "<h3>User Not Found</h3>"
    }
}
export {screen}