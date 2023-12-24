const userInput = document.getElementById("userName");
const getDetailsButton = document.getElementById("getDetails");
const profileInfo = document.getElementById("profileInfo");
const repo = document.getElementById("repoInfo");
getDetailsButton.addEventListener("click", async() => {
    const username = userInput.value;
    const res = await fetch(`https://api.github.com/users/${username}`);
    const data = await res.json();
    // console.log(data);
    getProfile(data);
    getRepo(username);
})
function getProfile(data){
    console.log(data);
    profileInfo.innerHTML =
    `<div class="card">
        <div class="card-img"><img src=${data.avatar_url} alt=${data.name}></div>
        <div class="card-body">
            <div class="card-title">${data.name}</div>
            <div class="card-subHeading">${data.login}</div>
            <div class="card-text"><p>${data.bio}</p><p><i class="fa-solid fa-user-group"></i>${data.followers} Followers ${data.following} Following</p>
            <p><i class="fa-solid fa-location-dot"></i>${data.location}</p>
            <button><a href=${data.html_url} target=_blank>Visit Profile</a></button>
            </div>
        </div>
    </div>`
}
async function getRepo(username) {
    const res = await fetch(`https://api.github.com/users/${username}/repos`);
    const repos = await res.json();
    for (let i = 0; i < repos.length; i++){
        repo.innerHTML += `<div class="card" style="width:20%">
        <div class="card-body">
            <div class="card-title">${repos[i].name}</div>
            <div class="card-subHeading">${repos[i].language}</div>
            <div class="card-text">
             <button><a href=${repos[i].html_url} target="_blank">Visit Repo</a></button>
            </div>
        </div>
    </div>`
    }
}