const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
let employees = require('./data/employees');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Helper function to generate new ID
const generateNewId = () => {
    return employees.length > 0 ? Math.max(...employees.map(emp => emp.id)) + 1 : 1;
};

// Routes

// GET /api/employees - Get all employees
app.get('/api/employees', (req, res) => {
    // Simulate network delay
    setTimeout(() => {
        res.json(employees);
    }, 2000);
});

// POST /api/employees - Create new employee
app.post('/api/employees', (req, res) => {
    const newEmployee = {
        id: generateNewId(),
        ...req.body
    };
    
    // Basic validation
    if (!newEmployee.firstName || !newEmployee.lastName || !newEmployee.age || 
        !newEmployee.department || !newEmployee.address || 
        !newEmployee.address.city || !newEmployee.address.street) {
        return res.status(400).json({ error: 'Missing required fields' });
    }
    
    console.log('Adding new employee:', newEmployee);
    employees.push(newEmployee);
    
    setTimeout(() => {
        res.status(201).json(newEmployee);
    }, 2000);
});

// PUT /api/employees/:id - Update employee
app.put('/api/employees/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const employeeIndex = employees.findIndex(emp => emp.id === id);
    
    if (employeeIndex === -1) {
        return res.status(404).json({ error: 'Employee not found' });
    }
    
    // Update employee with new data
    employees[employeeIndex] = {
        ...employees[employeeIndex],
        ...req.body,
        id: id // Ensure ID doesn't change
    };
    
    setTimeout(() => {
        res.json(employees[employeeIndex]);
    }, 2000);
});

// DELETE /api/employees/:id - Delete employee
app.delete('/api/employees/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const employeeIndex = employees.findIndex(emp => emp.id === id);
    
    if (employeeIndex === -1) {
        return res.status(404).json({ error: 'Employee not found' });
    }
    
    const deletedEmployee = employees.splice(employeeIndex, 1)[0];
    
    setTimeout(() => {
        res.json({ message: 'Employee deleted successfully', employee: deletedEmployee });
    }, 2000);
});

// Health check endpoint
app.get('/health', (req, res) => {
    res.json({ status: 'OK', message: 'Employee API is running' });
});

// 404 handler
app.use('*', (req, res) => {
    res.status(404).json({ error: 'Route not found' });
});

// Error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Employee API server is running on port ${PORT}`);
    console.log(`Health check: http://localhost:${PORT}/health`);
}); 