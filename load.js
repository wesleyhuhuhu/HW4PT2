var json = `
{
    "projects": 
    [
        {
            "h2": "Project 1",
            "img": "project1.jpg",
            "alt": "project 1",
            "p": "This is my project 1",
            "a": ""
        },
        {
            "h2": "Project 2",
            "img": "project2.jpg",
            "alt": "project 2",
            "p": "This is my project 2",
            "a": ""
        },
        {
            "h2": "Project 3",
            "img": "project3.jpg",
            "alt": "project 3",
            "p": "This is my project 3",
            "a": ""
        }
    ]
}`
localStorage.setItem('load', json);



var load;

class ProjectCard extends HTMLElement {
    constructor() {
      super();
  
      // Create a shadow DOM for the web component
      this.attachShadow({ mode: 'open' });
  
      // Create the HTML structure for the project card
      this.shadowRoot.innerHTML = `
        <style>
            img {
                max-width: 100%;
                height: auto;
            }
        </style>
        <h2 id="projectTitle">Project Title</h2>
        <img id="projectImage" src="" alt="Project Image">
        <p id="projectDescription">Project Description</p>
      `;
    }
}

window.addEventListener('DOMContentLoaded', init);

function init() {
    let section = document.getElementById('cards')
    document.getElementById('local').addEventListener('click', function () {
        section.classList.remove('hidden');
        section.classList.add('show');
        var localLoadObj = localStorage.getItem('load');
        load = JSON.parse(localLoadObj);
        updateCards();
    });
    
    document.getElementById('remote').addEventListener('click', function () {
        section.classList.remove('hidden');
        section.classList.add('show');
        getRemoteData();
    });
}

function getRemoteData() {
    const apiKey = '$2b$10$KtTuOY7fI4hmWivZDLrFNeG.XUZUp7KeHlMZTzEmb2ErfjCPmzq3.';
    const url = 'https://api.jsonbin.io/v3/b/64cffd828e4aa6225ecbbe20';

    fetch(url, {
        headers: {
            'X-Master-Key': apiKey,
            'Content-Type': 'application/json',
        }
    })
    .then(response => {
        return response.json();
    })
    .then(data => {
        console.log('data from bin', data.record);
        load = data.record;
        updateCards();
    })
}

function updateCards() {
    let cardArray = document.getElementsByTagName("project-card");
    for (let i = 0; i < cardArray.length; i++) {
        let title = load.projects[i].h2;
        cardArray[i].shadowRoot.getElementById('projectTitle').innerText = title || 'Project Title';
        let cardNum = title.charAt(title.length-1);
        cardArray[i].shadowRoot.getElementById('projectImage').src = `project${cardNum-1}.png`;
        cardArray[i].shadowRoot.getElementById('projectImage').alt = `project${cardNum-1} picture`;
        cardArray[i].shadowRoot.getElementById('projectDescription').innerText = load.projects[i].p || 'Project Description';
    }
}
  
  // Define the custom element
  customElements.define('project-card', ProjectCard);