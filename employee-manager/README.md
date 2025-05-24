# EmployeeManager

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.2.13.

## Architecture

This is a full-stack employee management application with:

- **Frontend**: Angular 19 with Akita state management
- **Backend**: Node.js Express API with CRUD operations
- **Containerization**: Docker Compose setup for both services

## Features

- View, add, edit, and delete employees
- Real-time filtering by name, department, and city
- Responsive design with modern UI
- State management with Akita
- RESTful API backend
- Docker containerization

## Getting Started

### Prerequisites

- Docker and Docker Compose
- Node.js 18+ (for local development)

### Running with Docker (Recommended)

1. Clone the repository
2. Run the application:

```bash
docker-compose up --build
```

This will start:
- Angular frontend at `http://localhost:4200`
- Node.js API at `http://localhost:3000`

### Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## API Documentation

The backend API provides the following endpoints:

- `GET /api/employees` - Get all employees
- `GET /api/employees/:id` - Get employee by ID
- `POST /api/employees` - Create new employee
- `PUT /api/employees/:id` - Update employee
- `DELETE /api/employees/:id` - Delete employee
- `GET /health` - Health check

See `api/README.md` for detailed API documentation.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Project Structure

```
employee-manager/
├── src/                    # Angular frontend source
│   ├── app/
│   │   ├── components/     # Angular components
│   │   ├── services/       # Services and HTTP calls
│   │   ├── state/          # Akita state management
│   │   ├── models/         # TypeScript interfaces
│   │   └── mock/           # Mock data (not used in production)
├── api/                    # Node.js backend
│   ├── data/              # Employee data
│   ├── server.js          # Express server
│   └── package.json       # Backend dependencies
├── docker-compose.yml      # Docker configuration
└── Dockerfile             # Frontend Docker image
```

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
