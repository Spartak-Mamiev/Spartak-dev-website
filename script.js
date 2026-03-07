const body = document.body;
const toggle = document.querySelector('.toggle');
const modeToggle = document.querySelector('#mode-toggle');
const modeLabel = document.querySelector('.mode-switch-container label');

const skillsContainer = document.querySelector('.skills-main-container');

const savedTheme = localStorage.getItem('theme');
const systemPrefersDark = window.matchMedia(
  '(prefers-color-scheme: dark)',
).matches;

let currentTheme = savedTheme || (systemPrefersDark ? 'dark' : 'light');

applyTheme(currentTheme);

window
  .matchMedia('(prefers-color-scheme: dark)')
  .addEventListener('change', (event) => {
    if (!localStorage.getItem('theme')) {
      const newTheme = event.matches ? 'dark' : 'light';
      applyTheme(newTheme);
    }
  });

function applyTheme(theme) {
  if (theme === 'dark') {
    body.classList.add('dark-mode');
    toggle.style.transform = 'translateX(24px)';
    modeToggle.checked = true;
    toggle.innerHTML =
      '<img class="toggle-icon" src="icons/light_mode_24dp_000000_FILL0_wght400_GRAD0_opsz24.svg" alt="dark mode icon" style="filter: invert(1)">';
  } else {
    body.classList.remove('dark-mode');
    toggle.style.transform = 'translateX(0px)';
    modeToggle.checked = false;
    toggle.innerHTML =
      '<img class="toggle-icon" src="icons/mode_night_24dp_FFFFFF_FILL0_wght400_GRAD0_opsz24.svg" alt="light mode icon" style="filter: invert(1);">';
  }
}

modeToggle.addEventListener('change', () => {
  const isDark = body.classList.toggle('dark-mode');
  const theme = isDark ? 'dark' : 'light';
  localStorage.setItem('theme', theme);
  applyTheme(theme);
});

fetch('skills.json')
  .then((response) => response.json())
  .then((values) => {
    skillsContainer.innerHTML = '';
    values.forEach((value) => {
      skillsContainer.innerHTML += `
          <div class="html skill-container">
            <img src="${value.icon}" alt="${value.name} icon" />
            <h1>${value.name}</h1>
            <p>${value.description}</p>
          </div>`;
    });
  });

// ==========================================
// CALCULATOR
// ==========================================
const calcDisplay = document.getElementById('calc-display');
const calcButtons = document.querySelectorAll('.calc-btn');

let calcCurrent = '0';
let calcPrevious = '';
let calcOperator = '';
let calcResetNext = false;

function calcUpdate() {
  calcDisplay.textContent = calcCurrent;
}

function calcOperate(a, op, b) {
  const x = parseFloat(a);
  const y = parseFloat(b);
  switch (op) {
    case '+':
      return x + y;
    case '-':
      return x - y;
    case '*':
      return x * y;
    case '/':
      return y === 0 ? 'Error' : x / y;
    default:
      return y;
  }
}

calcButtons.forEach((btn) => {
  btn.addEventListener('click', () => {
    const action = btn.dataset.action;
    const value = btn.dataset.value;

    switch (action) {
      case 'number':
        if (calcCurrent === '0' || calcResetNext) {
          calcCurrent = value;
          calcResetNext = false;
        } else {
          calcCurrent += value;
        }
        break;

      case 'decimal':
        if (calcResetNext) {
          calcCurrent = '0.';
          calcResetNext = false;
        } else if (!calcCurrent.includes('.')) {
          calcCurrent += '.';
        }
        break;

      case 'op':
        if (calcOperator && !calcResetNext) {
          const result = calcOperate(calcPrevious, calcOperator, calcCurrent);
          calcCurrent = String(result);
        }
        calcPrevious = calcCurrent;
        calcOperator = value;
        calcResetNext = true;
        break;

      case 'equals':
        if (calcOperator) {
          const result = calcOperate(calcPrevious, calcOperator, calcCurrent);
          calcCurrent = String(result);
          calcOperator = '';
          calcPrevious = '';
          calcResetNext = true;
        }
        break;

      case 'clear':
        calcCurrent = '0';
        calcPrevious = '';
        calcOperator = '';
        calcResetNext = false;
        break;

      case 'sign':
        if (calcCurrent !== '0') {
          calcCurrent = String(-parseFloat(calcCurrent));
        }
        break;

      case 'percent':
        calcCurrent = String(parseFloat(calcCurrent) / 100);
        break;
    }

    // Avoid very long decimals
    if (calcCurrent.includes('.') && calcCurrent.length > 12) {
      calcCurrent = String(parseFloat(parseFloat(calcCurrent).toPrecision(10)));
    }

    calcUpdate();
  });
});

// Keyboard support
document.addEventListener('keydown', (e) => {
  const key = e.key;
  if (key >= '0' && key <= '9') {
    document
      .querySelector(`.calc-btn[data-value="${key}"][data-action="number"]`)
      ?.click();
  } else if (key === '.') {
    document.querySelector('.calc-btn[data-action="decimal"]')?.click();
  } else if (key === '+' || key === '-') {
    document.querySelector(`.calc-btn[data-value="${key}"]`)?.click();
  } else if (key === '*') {
    document.querySelector('.calc-btn[data-value="*"]')?.click();
  } else if (key === '/') {
    e.preventDefault();
    document.querySelector('.calc-btn[data-value="/"]')?.click();
  } else if (key === 'Enter' || key === '=') {
    document.querySelector('.calc-btn[data-action="equals"]')?.click();
  } else if (key === 'Escape' || key === 'Delete') {
    document.querySelector('.calc-btn[data-action="clear"]')?.click();
  } else if (key === 'Backspace') {
    if (calcCurrent.length > 1) {
      calcCurrent = calcCurrent.slice(0, -1);
    } else {
      calcCurrent = '0';
    }
    calcUpdate();
  } else if (key === '%') {
    document.querySelector('.calc-btn[data-action="percent"]')?.click();
  }
});

// ==========================================
// CUSTOM CURSOR & PAINT TRAIL
// ==========================================
const customCursor = document.getElementById('custom-cursor');
const trailColors = ['#FF6B9D', '#7FDBCA', '#C8B8DB', '#FFD166', '#2D2640'];
let lastTrailTime = 0;
const TRAIL_INTERVAL = 35; // ms between trail dots
const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

// Speed tracking for cursor stretch
let prevX = 0;
let prevY = 0;
let prevTime = Date.now();
let idleTimer = null;

if (!isTouchDevice && customCursor) {
  // Move custom cursor
  document.addEventListener('mousemove', (e) => {
    customCursor.style.left = e.clientX + 'px';
    customCursor.style.top = e.clientY + 'px';

    // Calculate speed and stretch
    const now = Date.now();
    const dt = now - prevTime || 1;
    const dx = e.clientX - prevX;
    const dy = e.clientY - prevY;
    const speed = Math.sqrt(dx * dx + dy * dy) / dt;
    const angle = Math.atan2(dy, dx) * (180 / Math.PI);

    // Stretch proportional to speed, capped
    const stretch = Math.min(speed * 1.8, 2.2);

    if (stretch > 1.05) {
      const squeeze = 1 / Math.max(stretch, 1);
      customCursor.classList.add('moving');
      customCursor.style.transform = `translate(-50%, -50%) rotate(${angle}deg) scaleX(${stretch.toFixed(2)}) scaleY(${squeeze.toFixed(2)})`;
    }

    prevX = e.clientX;
    prevY = e.clientY;
    prevTime = now;

    // Return to idle wobble after mouse stops
    clearTimeout(idleTimer);
    idleTimer = setTimeout(() => {
      customCursor.classList.remove('moving');
      customCursor.style.transform = 'translate(-50%, -50%)';
    }, 100);

    // Throttle trail creation
    if (now - lastTrailTime < TRAIL_INTERVAL) return;
    lastTrailTime = now;

    // Create trail dot
    const dot = document.createElement('div');
    dot.className = 'paint-trail';
    const size = Math.random() * 8 + 4;
    dot.style.width = size + 'px';
    dot.style.height = size + 'px';
    dot.style.left = e.clientX - size / 2 + 'px';
    dot.style.top = e.clientY - size / 2 + 'px';
    dot.style.backgroundColor =
      trailColors[Math.floor(Math.random() * trailColors.length)];
    dot.style.borderRadius = `${30 + Math.random() * 40}% ${30 + Math.random() * 40}% ${30 + Math.random() * 40}% ${30 + Math.random() * 40}%`;
    document.body.appendChild(dot);

    setTimeout(() => dot.remove(), 400);
  });

  // Click effect
  document.addEventListener('mousedown', () => {
    customCursor.classList.add('clicking');
    // Create splash burst on click
    const rect = customCursor.getBoundingClientRect();
    for (let i = 0; i < 5; i++) {
      const splash = document.createElement('div');
      splash.className = 'paint-trail';
      const size = Math.random() * 6 + 3;
      const angle = (Math.PI * 2 * i) / 5;
      const dist = 10 + Math.random() * 10;
      splash.style.width = size + 'px';
      splash.style.height = size + 'px';
      splash.style.left =
        rect.left + rect.width / 2 + Math.cos(angle) * dist - size / 2 + 'px';
      splash.style.top =
        rect.top + rect.height / 2 + Math.sin(angle) * dist - size / 2 + 'px';
      splash.style.backgroundColor =
        trailColors[Math.floor(Math.random() * trailColors.length)];
      splash.style.borderRadius = '50%';
      document.body.appendChild(splash);
      setTimeout(() => splash.remove(), 400);
    }
  });

  document.addEventListener('mouseup', () => {
    customCursor.classList.remove('clicking');
  });
} else {
  // Hide custom cursor on touch devices
  if (customCursor) customCursor.style.display = 'none';
}

// ==========================================
// LIQUID SPLASH ON BUTTON HOVER
// ==========================================
function initLiquidSplash() {
  const liquidButtons = document.querySelectorAll(
    '.cta, .my-projects-cta, .calc-btn, #submit',
  );

  liquidButtons.forEach((btn) => {
    btn.addEventListener('mouseenter', function (e) {
      const rect = this.getBoundingClientRect();
      const btnColor = getComputedStyle(this).backgroundColor;

      // Create 6-8 extra splash droplets around the button
      const numDroplets = 6 + Math.floor(Math.random() * 3);
      for (let i = 0; i < numDroplets; i++) {
        const droplet = document.createElement('div');
        droplet.className = 'paint-trail';
        const size = Math.random() * 10 + 5;
        const angle = (Math.PI * 2 * i) / numDroplets + Math.random() * 0.4;
        const dist =
          Math.max(rect.width, rect.height) / 2 + 10 + Math.random() * 20;

        droplet.style.width = size + 'px';
        droplet.style.height = size + 'px';
        droplet.style.left =
          rect.left + rect.width / 2 + Math.cos(angle) * dist - size / 2 + 'px';
        droplet.style.top =
          rect.top + rect.height / 2 + Math.sin(angle) * dist - size / 2 + 'px';
        droplet.style.backgroundColor =
          trailColors[Math.floor(Math.random() * trailColors.length)];
        droplet.style.borderRadius = `${30 + Math.random() * 40}% ${30 + Math.random() * 40}% ${30 + Math.random() * 40}% ${30 + Math.random() * 40}%`;

        document.body.appendChild(droplet);
        setTimeout(() => droplet.remove(), 400);
      }
    });
  });
}

// Initialize liquid splash on static buttons
initLiquidSplash();
