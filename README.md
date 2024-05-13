# PReview

**PReview** is designed to automate and enhance the pull request review process. It provides detailed analytics on developer activities, facilitating better management and efficiency in software projects.

**Deliverable for CS453 - Application Lifecycle Management course project.**

## Changelog

All notable changes to this project will be documented in this section. The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/), and this project adheres to [Semantic Versioning](http://semver.org/).


### [1.0.0] - 2024-05-13
#### Added
- Initial release of PReview.
- Complete backend API for handling pull requests.
- Frontend React application with displaying statistics for both repositories and developers.

#### Known Issues
- Minor display bugs in UI under certain resolutions.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

Before you can run the project, you need to install the following software:

- **Node.js**: A JavaScript runtime built on Chrome's V8 JavaScript engine. [Download Node.js](https://nodejs.org/)
- **npm**: A package manager for JavaScript, included with Node.js.


Ensure you install the versions required by the project or as instructed by the project documentation.

### Installing

Here are the steps to set up your development environment:

1. **Clone the repository**
   ```bash
   git clone https://github.com/emre-karatas/PReview.git
   cd PReview
   
2. **Set up the Backend**
   ```bash
   cd backexpress
   npm install
   npm start
This command will start the backend server on http://localhost:8080.

3. **Set up the Frontend**
   ```bash
   cd front
   npm install
   npm start
This command will start the frontend server on http://localhost:3000.

## Troubleshooting

Here are some common issues and solutions that might help you solve problems encountered during the setup and use of PReview:

### Issue: Backend server does not start
- **Problem**: `Error: Cannot find module 'express'`
- **Solution**: This usually indicates that npm packages are not installed correctly. Run `npm install` in the backend directory to install all required dependencies.

### Issue: Frontend displays "Cannot connect to backend" error
- **Problem**: The frontend application cannot make API calls to the backend.
- **Solution**: Ensure that the backend server is running and accessible. Check the backend server URL in the frontend configuration and ensure it matches the URL where the backend is running.

### Issue: Changes in the backend are not reflected
- **Problem**: After updating backend code, changes don't seem to take effect.
- **Solution**: Restart the backend server. If running in development mode, ensure that the nodemon or similar tool is being used to automatically restart the server after changes.


### Issue: Frontend does not update after changes
- **Problem**: Changes to React components do not appear after refreshing the browser.
- **Solution**: Ensure that the webpack development server is running correctly. If persistent, try clearing the browser cache or using hard reload (Ctrl+F5 or Cmd+Shift+R).

### Issue: High latency in pull request processing
- **Problem**: Processing pull requests takes longer than expected.
- **Solution**: Check the network conditions between the frontend, backend, and GitHub API. Optimize the API calls in the backend to reduce the number of requests or batch them if possible.

### Issue: Login issues
- **Problem**: Users are unable to log in to the frontend application.
- **Solution**: Verify that the authentication backend is operational and that the database containing user credentials is reachable. Check the console for errors related to authentication and session management.
