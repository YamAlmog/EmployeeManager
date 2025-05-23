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
src/
├── app/
│   ├── components/      # Reusable UI components
│   ├── models/         # Data models and interfaces
│   ├── services/       # API and business logic services
│   └── pages/          # Main application pages
├── assets/            # Static files
└── environments/      # Environment configuration
```

## Development

- Run `ng serve` for a dev server
- Run `ng build` to build the project
- Run `ng test` to execute unit tests
- Run `ng e2e` to execute end-to-end tests

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request 