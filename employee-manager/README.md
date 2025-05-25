# Employee Manager

A simple app to manage employees. You can view, add, edit, and delete employees. The app has a modern Angular frontend and a Node.js backend API. Both run easily with Docker.

## Features
- View all employees in a table
- Filter by name, department, or city
- Add, edit, and delete employees
- Responsive design

## Quick Start (Recommended: Docker)

1. **Clone this repository**
2. **Start everything with Docker Compose:**
   ```bash
   docker-compose up --build
   ```
3. **Open your browser:**
   - Frontend: [http://localhost:4200](http://localhost:4200)
   - API: [http://localhost:3000/api/employees](http://localhost:3000/api/employees)

## Running Locally (Without Docker)

### Frontend (Angular)
```bash
npm install
npm start
```
Go to [http://localhost:4200](http://localhost:4200)

### Backend (Node.js API)
```bash
cd api
npm install
npm start
```
API will be at [http://localhost:3000/api/employees](http://localhost:3000/api/employees)

## API Endpoints (Summary)
- `GET /api/employees` — List all employees
- `GET /api/employees/:id` — Get one employee
- `POST /api/employees` — Add new employee
- `PUT /api/employees/:id` — Update employee
- `DELETE /api/employees/:id` — Delete employee

## Project Structure
```
employee-manager/
├── src/         # Angular frontend
├── api/         # Node.js backend
├── docker-compose.yml
└── Dockerfile
```

## Need Help?
- For more details, see the `api/README.md` for backend info.
- If you have Docker and Node.js, you're ready to go!
