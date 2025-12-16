# To-Do List Project

A simple and efficient to-do list application designed to help you manage your daily tasks effectively. This project is built with modern web technologies and is deployed on GitHub Pages for easy access.

## 📋 Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [GitHub Pages Deployment](#github-pages-deployment)
- [Contributing](#contributing)
- [License](#license)

## 📝 Project Overview

This to-do list application provides a user-friendly interface for managing tasks. Whether you're planning your day, organizing a project, or tracking personal goals, this application helps you stay organized and productive.

The application is lightweight, responsive, and works seamlessly across all modern browsers.

## ✨ Features

- ✅ **Add Tasks**: Create new tasks with ease
- ✅ **Mark Complete**: Check off tasks as you complete them
- ✅ **Delete Tasks**: Remove tasks you no longer need
- ✅ **Edit Tasks**: Modify existing task descriptions
- ✅ **Persistent Storage**: Tasks are saved in your browser's local storage
- ✅ **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- ✅ **Clean UI**: Intuitive and minimalist user interface
- ✅ **Real-time Updates**: Instant feedback on all actions

## 🛠️ Technologies Used

- **HTML5**: Semantic markup and structure
- **CSS3**: Modern styling and responsive design
- **JavaScript (Vanilla)**: Dynamic functionality and interactivity
- **Local Storage API**: Client-side data persistence
- **GitHub Pages**: Hosting and deployment

## 💻 Installation

### Prerequisites

- Git
- A modern web browser (Chrome, Firefox, Safari, Edge)

### Steps

1. Clone the repository:
```bash
git clone https://github.com/ashourdev1/todolist.git
cd todolist
```

2. Open the application in your browser:
   - Simply open `index.html` in your preferred web browser, or
   - Use a local server (Python, Node.js, or any HTTP server)

### Using a Local Server (Optional)

**Python 3:**
```bash
python -m http.server 8000
```

**Node.js (with http-server):**
```bash
npm install -g http-server
http-server
```

Then navigate to `http://localhost:8000` in your browser.

## 🚀 Usage

1. **Adding a Task**:
   - Type your task in the input field
   - Click the "Add" button or press Enter
   - Your task appears in the list

2. **Completing a Task**:
   - Click the checkbox next to a task to mark it as complete
   - The task will be visually updated (strikethrough styling)

3. **Editing a Task**:
   - Click the edit button on a task
   - Modify the task description
   - Save your changes

4. **Deleting a Task**:
   - Click the delete button (trash icon) on a task
   - The task will be removed from your list

5. **Data Persistence**:
   - All tasks are automatically saved to your browser's local storage
   - Your tasks will be available even after closing and reopening the browser

## 📱 GitHub Pages Deployment

This project is deployed and hosted on GitHub Pages, making it accessible online without any server setup.

### Accessing the Live Application

Visit the live application here: [https://ashourdev1.github.io/todolist/](https://ashourdev1.github.io/todolist/)

### How It's Deployed

The application is automatically deployed to GitHub Pages using the following setup:

1. **Repository Settings**:
   - The repository has GitHub Pages enabled
   - Source branch: `main` (or `gh-pages` if using a separate branch)
   - Source folder: `/ (root)` or `/docs`

2. **Files Required**:
   - `index.html` - Main application file
   - `style.css` - Styling
   - `script.js` - Application logic
   - All necessary assets (images, fonts, etc.)

### Manual Deployment Steps

If you've forked or cloned this repository:

1. **Enable GitHub Pages** in your repository:
   - Go to Settings → Pages
   - Select the branch where your files are (typically `main`)
   - Choose the folder (`/root` for files in the main directory, or `/docs` for a docs folder)
   - Click Save

2. **Wait for Deployment**:
   - GitHub will automatically build and deploy your site
   - Your application will be available at `https://<your-username>.github.io/todolist/`

3. **Custom Domain** (Optional):
   - You can add a custom domain in the Pages settings
   - Configure your DNS settings accordingly

### Automatic Deployment

Every push to the main branch automatically triggers a deployment:
- No build process needed (this is a static site)
- Changes go live within seconds
- All files are served directly as-is

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Development Tips

- Keep code clean and well-commented
- Test thoroughly across different browsers
- Maintain responsive design principles
- Update documentation as needed

## 📄 License

This project is open source and available under the MIT License. See the LICENSE file for more details.

## 📧 Contact & Support

- **Author**: ashourdev1
- **GitHub**: [https://github.com/ashourdev1](https://github.com/ashourdev1)
- **Issues**: Report bugs or suggest features via [GitHub Issues](https://github.com/ashourdev1/todolist/issues)

## 🎯 Future Enhancements

Potential features for future versions:

- [ ] Category/Tag support for organizing tasks
- [ ] Priority levels for tasks
- [ ] Due dates and reminders
- [ ] Dark mode theme
- [ ] Task filtering and search
- [ ] Cloud synchronization
- [ ] Mobile app version
- [ ] Collaborative task sharing

---

**Happy Task Managing! 🎉**

Made with ❤️ by ashourdev1
