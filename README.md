# Employee Management System

A modern Employee Management System built with Angular, providing basic functionality for managing employee data.

## Features

- Employee listing
- Add/Edit/Delete employees
- Employee details view
- Basic authentication
- Responsive design

## Prerequisites

- Node.js (v14 or higher)
- Docker and Docker Compose
- Angular CLI

## Getting Started

### Development Setup

1. Clone the repository:
```bash
git clone https://github.com/YamAlmog/EmployeeManager.git
cd EmpolyeesManager
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
ng serve
```
Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

### Docker Setup

1. Build and run the application using Docker Compose:
```bash
docker-compose up --build
```

The application will be available at `http://localhost:4200/`

To stop the containers:
```bash
docker-compose down
```

## Running Tests

### End-to-End Tests with Cypress

1. First, make sure the application is running with Docker Compose:
```bash
docker-compose up --build
```

2. In a new terminal, run the Cypress tests:
```bash
# Open Cypress Test Runner (interactive mode)
npx cypress open

# Or run tests in headless mode (runs in the terminal without opening a browser window)
npx cypress run
```

The Cypress tests will run against the dockerized application running at `http://localhost:4200`.


Key test files:
- `e2e/cypress/e2e/employee-crud.cy.js`: Tests for employee CRUD operations

## Project Structure

```
employee-manager/
├── src/                 # Frontend source code
│   ├── app/             # Main Angular app code
│   │   ├── components/  # UI components
│   │   ├── models/      # Data models and interfaces
│   │   ├── services/    # Angular services
│   │   ├── state/       # State management
│   │   └── ...
│   ├── main.ts          # Angular entry point
│   ├── index.html       # App HTML shell
│   └── styles.css       # Global styles
├── public/              # Static assets (favicon, etc.)
├── api/                 # Backend API (Node.js)
│   ├── server.js        # Express server
│   ├── data/            # Employee data storage
│   └── ...
├── docker-compose.yml   # Docker Compose config
├── Dockerfile           # Frontend Docker build
├── package.json         # Project dependencies
└── README.md            
```