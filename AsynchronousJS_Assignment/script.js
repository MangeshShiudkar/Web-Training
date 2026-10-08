const usernameInput = document.getElementById("username");
const searchButton = document.getElementById("searchButton");
const message = document.getElementById("message");
const ownerContainer = document.getElementById("owner");
const repositoriesContainer = document.getElementById("repositories");
let refreshInterval;

async function fetchRepositories(username) {
    const response = await fetch(`https://api.github.com/users/${username}/repos?per_page=100`);
    if (!response.ok) {
        throw new Error("Unable to fetch repositories");
    }
    return await response.json();
}

async function fetchOwnerDetails(username) {
    const response = await fetch(`https://api.github.com/users/${username}`);
    if (!response.ok) {
        throw new Error("Invalid GitHub username");
    }
    return await response.json();
}

async function fetchGitHubData(username) {
    try {
        message.textContent = "Loading...";
        ownerContainer.innerHTML = "";
        repositoriesContainer.innerHTML = "";
        ownerContainer.style.display = "none";
        repositoriesContainer.style.display = "none";

        const owner = await fetchOwnerDetails(username);
        const repositories = await fetchRepositories(username);

        ownerContainer.style.display = "block";
        repositoriesContainer.style.display = "block";

        if(repositories.length === 0) {
            message.textContent = "This user has no public repositories.";
            displayOwner(owner);
            return;
        }

        message.textContent = "";
        displayOwner(owner);
        displayRepositories(repositories);
    }catch (error) {
        message.textContent = error.message;
    }
}

function displayOwner(owner) {
    ownerContainer.innerHTML = `
        <h2>Owner Details</h2>
        <p><strong>Name:</strong> ${owner.name || "Not available"}</p>
        <p><strong>Username:</strong> ${owner.login}</p>
        <p><strong>Public Repositories:</strong> ${owner.public_repos}</p>
    `;
}

function displayRepositories(repositories) {
    repositoriesContainer.innerHTML = `<h2>Repositories</h2>`;
    let count = 0;
    for (const repo of repositories) {
        const repositoryElement = document.createElement("div");
        repositoryElement.innerHTML = `
            <h3>${count + 1}. ${repo.name}</h3>
            <p>
                <strong>Description:</strong>
                ${repo.description || "No description"}
            </p>
            <p>
                <strong>Owner:</strong>
                ${repo.owner.login}
            </p>
        `;
        repositoriesContainer.appendChild(repositoryElement);
        count++;
    }
}

function startRefresh(username) {
    clearInterval(refreshInterval);
    refreshInterval = setInterval(() => {
        fetchGitHubData(username);
    }, 60000);
}

searchButton.addEventListener("click", () => {
    const username = usernameInput.value.trim();
    if (username) {
        fetchGitHubData(username);
        startRefresh(username);
    } else {
        message.textContent = "Please enter a GitHub username.";
    }
})


