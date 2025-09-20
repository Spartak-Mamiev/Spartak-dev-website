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
  toggle.innerHTML =
     '<img class="toggle-icon" src="icons/light_mode_24dp_000000_FILL0_wght400_GRAD0_opsz24.svg" alt="dark mode icon" style="filter: invert(1)">';
} else {

  toggle.innerHTML =
   '<img class="toggle-icon" src="icons/mode_night_24dp_FFFFFF_FILL0_wght400_GRAD0_opsz24.svg" alt="light mode icon" style="filter: invert(1);">';
}



modeToggle.addEventListener('change', () => {
  const isDark = body.classList.toggle('dark-mode');

  if (isDark) {
    toggle.style.transform = 'translateX(24px)';
    localStorage.setItem('theme', 'dark');
    toggle.innerHTML = '<img class="toggle-icon" class="toggle-icon" src="icons/light_mode_24dp_000000_FILL0_wght400_GRAD0_opsz24.svg" alt="light mode icon" style="filter: invert(1);">'
  } else {
    toggle.style.transform = 'translateX(0px)';
    localStorage.setItem('theme', 'light');
    toggle.innerHTML = '<img class="toggle-icon" src="icons/mode_night_24dp_FFFFFF_FILL0_wght400_GRAD0_opsz24.svg" alt="light mode icon" style="filter: invert(1);">'
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