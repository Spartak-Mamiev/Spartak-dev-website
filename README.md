# Spartak-dev-website

## Overview

This is a personal portfolio website project. It showcases my skills, projects, and contact information in a modern, responsive design. The site is built with HTML, CSS, and JavaScript, and uses JSON files for dynamic content. It features light/dark mode, cookie consent, and custom hand-drawn images.

## Features

- **Responsive Design:** Adapts to desktop and mobile screens with dedicated CSS files.
- **Theme Switcher:** Toggle between light and dark mode, with preference saved in localStorage.
- **Cookie Consent:** Banner for Google Analytics consent, loaded only after acceptance.
- **Dynamic Skills & Projects:** Skills and projects are loaded from JSON files and rendered dynamically.
- **Custom Graphics:** Includes hand-drawn images and custom icons.

## File Structure

- `index.html` — Main HTML file for the website.
- `style.css` — Main stylesheet for desktop.
- `mobile-screen.css` — Styles for mobile devices (max-width: 650px).
- `1200px-screen.css` — Styles for medium screens (max-width: 1150px).
- `script.js` — Handles theme switching, cookie consent, and dynamic content loading.
- `projects.json` — List of projects with name, description, link, and image.
- `skills.json` — List of skills with icon, name, and description.
- `hand-drawn-images/` — Custom hand-drawn PNG images for UI sections and icons.
- `icons/` — SVG and PNG icons for skills and social links.
- `images/` — Project screenshots and personal images.

## Usage

1. **Open `index.html` in a browser** to view the site locally.
2. **Edit `skills.json` and `projects.json`** to update your skills and projects.
3. **Customize images** in `hand-drawn-images/`, `icons/`, and `images/` as needed.
4. **Modify styles** in `style.css`, `mobile-screen.css`, and `1200px-screen.css` for further design changes.
5. **Update scripts** in `script.js` for new interactivity or analytics.

## Customization

- **Add new skills:** Edit `skills.json` and add an object with `icon`, `name`, and `description`.
- **Add new projects:** Edit `projects.json` and add an object with `projectName`, `projectDescription`, `link`, and `image`.
- **Change theme colors:** Edit CSS variables in `style.css` and related files.

## Credits

- Hand-drawn images and icons by Spartak Mamiev.
- Project and skill data inspired by Frontend Mentor challenges.

---

This project is a learning exercise and a showcase of web development skills. Feel free to fork and adapt for your own use!
