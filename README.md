# 💻 Personal Portfolio - Jostin Rendón

[![Live Demo](https://img.shields.io/badge/Demo-Live_Preview-blue?style=for-the-badge)](https://jr-portfolio-theta.vercel.app/)
[![Vercel Deployment](https://img.shields.io/badge/Vercel-Deployed-black?style=for-the-badge&logo=vercel)](https://jr-portfolio-theta.vercel.app/)

> A professional portfolio showcasing the projects, skills, and experience of a Systems Engineering student at the University of Guayaquil.

---

## 📸 Preview

![Portfolio Screenshot](./preview.png)

---

## 📖 About the Project

This repository contains the source code for my personal web portfolio. It is designed to be a clean, modern, and fully responsive showcase of my professional work, certifications, and technical skills as I progress in my career in Systems Engineering and IT. 

The project prioritizes performance, accessibility, and a seamless user experience across devices without relying on heavy frameworks.

## 🛠️ Tech Stack

This project was built from scratch using core web technologies to ensure optimal performance and complete control over the design:

- **HTML5**: Semantic and accessible markup.
- **CSS3**: Custom styling, CSS Variables, Flexbox/Grid layouts, and smooth animations (No frameworks).
- **JavaScript (Vanilla)**: DOM manipulation, custom interactions, and dynamic content.
- **EmailJS**: Seamless integration for the automated contact form without needing a custom backend.
- **Vercel**: Continuous Integration and Continuous Deployment (CI/CD) for fast, reliable hosting.

## ✨ Key Features

- **📱 Responsive Design**: Fully optimized for mobile, tablet, and desktop environments.
- **🌍 Multi-language Support**: Custom i18n logic implemented in JavaScript to seamlessly switch between English (EN) and Spanish (ES) without page reloads.
- **🔗 Real Project Showcases**: Includes live demo links to actual deployed projects such as *"Blade & Co."* and *"NÓVA Store"*.
- **✉️ Automated Contact Form**: Functional contact section with form validation and email automation powered by EmailJS.
- **🎨 Custom UI/UX**: Features tailored micro-interactions, floating tags, scroll reveals, and a custom cursor.

## 🏗️ Project Structure & Refactoring

Initially built as a monolithic HTML file, the project was successfully refactored into a modular architecture. This separation of concerns significantly improves scalability and maintainability:

- `index.html`: Contains only the structural markup and content.
- `style.css`: Houses all styling, animations, and responsive breakpoints.
- `script.js`: Manages interactivity, form validation, and the custom i18n logic.

```text
📦 portfoliojr
 ┣ 📜 index.html
 ┣ 📜 style.css
 ┣ 📜 script.js
 ┗ 📜 README.md
```

## 🚀 Deployment

The portfolio is automatically deployed and hosted via **Vercel**. Every push to the main branch triggers a new build, ensuring that the live site is always up-to-date with the latest changes in the repository.

---

*Designed & coded with intention by Jostin Rendón.*
