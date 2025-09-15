const body = document.body;
const toggle = document.querySelector('.toggle');
const modeToggle = document.querySelector('#mode-toggle');
const modeLabel = document.querySelector('.mode-switch-container label');


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
