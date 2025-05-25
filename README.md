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
git clone <your-repo-url>
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

## Development

- Run `ng serve` for a dev server
- Run `ng build` to build the project
- Run `ng test` to execute unit tests
- Run `ng e2e` to execute end-to-end tests
