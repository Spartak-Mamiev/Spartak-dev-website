const body = document.body;
const toggle = document.querySelector('.toggle');
const modeToggle = document.querySelector('#mode-toggle');
const modeLabel = document.querySelector('.mode-switch-container label');

const skillsContainer = document.querySelector('.skills-main-container');

const projectsContainer = document.querySelector('.projects-container');


const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
  body.classList.add('dark-mode');
  toggle.style.transform = 'translateX(24px)';
  modeToggle.checked = true;
  modeLabel.textContent = 'Light mode';
}


modeToggle.addEventListener('change', () => {
  const isDark = body.classList.toggle('dark-mode');

  if (isDark) {
    toggle.style.transform = 'translateX(24px)';
    modeLabel.textContent = 'Light mode';
    localStorage.setItem('theme', 'dark');
  } else {
    toggle.style.transform = 'translateX(0px)';
    modeLabel.textContent = 'Dark mode';
    localStorage.setItem('theme', 'light');
  }
});



fetch('skills.json')
  .then(response => response.json())
  .then(values => {
    skillsContainer.innerHTML = '';
    values.forEach(value => {
      skillsContainer.innerHTML += `
          <div class="html skill-container">
            <img src="${value.icon}" alt="${value.name} icon" />
            <h1>${value.name}</h1>
            <p>${value.description}</p>
          </div>`;
    });
  });



fetch('projects.json')
  .then(response => response.json())
  .then(values => {
    projectsContainer.innerHTML = '';
    values.forEach( value => {
      projectsContainer.innerHTML += `
      <div class="project-card">
        <div class="project-description-container">
          <h1>${value.projectName}</h1>
          <p class="project-description">
            ${value.projectDescription}
          </p>
          <a
            href="${value.link}"
            target="_blank"
            >View The Project</a
          >
        </div>
        <a
          href="${value.link}"
          target="_blank"
          ><img
            class="project-screenshot"
            src="${value.image}"
            alt="${value.projectName} image"
        /></a>
      </div>
      `
    })
  })