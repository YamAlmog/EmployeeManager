# Employee Management API

A simple REST API for managing employee data built with Node.js and Express.

## Features

- CRUD operations for employees
- CORS enabled for frontend integration
- Simulated network delays for realistic testing
- Health check endpoint
- In-memory data storage (resets on restart)

## API Endpoints

### Base URL
```
http://localhost:3000/api
```

### Endpoints

#### Get All Employees
```
GET /employees
```
Returns an array of all employees.

#### Get Employee by ID
```
GET /employees/:id
```
Returns a specific employee by ID.

#### Create New Employee
```
POST /employees
```
Creates a new employee. Request body should include:
```json
{
  "firstName": "string",
  "lastName": "string",
  "age": number,
  "department": "string",
  "address": {
    "city": "string",
    "street": "string"
  }
}
```

#### Update Employee
```
PUT /employees/:id
```
Updates an existing employee. Request body can include any employee fields to update.

#### Delete Employee
```
DELETE /employees/:id
```
Deletes an employee by ID.

#### Health Check
```
GET /health
```
Returns API status.

## Running with Docker

The API is configured to run in a Docker container alongside the Angular frontend:

```bash
docker-compose up
```

The API will be available at `http://localhost:3000`

## Development

To run locally:

```bash
cd api
npm install
npm start
```

Or for development with auto-reload:

```bash
npm run dev
``` 