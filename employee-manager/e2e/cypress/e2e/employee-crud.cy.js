describe('Employee Manager Basic Tests', () => {
  it('should display basic page elements', () => {
    // Visit the page and log the current URL
    cy.visit('/')
      .then(() => {
        cy.log('Current URL:', cy.url());
      });

    // Log what we see in the body
    cy.get('body').then($body => {
      cy.log('Body content:', $body.html());
    });

    // Check if app-root exists
    cy.get('app-root')
      .should('exist')
      .then($root => {
        cy.log('app-root content:', $root.html());
      });

    // Very basic check - just see if any content renders
    cy.get('body').should('not.be.empty');
  });

  it('should handle loading state and data correctly', () => {
    // Mock or observe real API
    cy.intercept('GET', '**/api/employees').as('getEmployees');
  
    cy.visit('/');
  
    // Wait for API
    cy.wait('@getEmployees', { timeout: 30000 }).then(interception => {
      cy.log('API response:', JSON.stringify(interception.response?.body));
    });
  
    // Wait until loading disappears
    cy.get('.loading-container', { timeout: 10000 }).should('not.exist');
  
    // Wait for either table or no-data
    cy.get('table, .no-data').should('exist');
  
    // Confirm visibility
    cy.get('body').then($body => {
      if ($body.find('table').length > 0) {
        cy.get('table').should('be.visible');
      } else {
        cy.get('.no-data').should('be.visible');
      }
    });
  });

  it('should add a new employee successfully', () => {
    // Test data for new employee
    const newEmployee = {
      firstName: 'John',
      lastName: 'Doe',
      age: 30,
      city: 'New York',
      street: '123 Broadway',
      department: 'Engineering'
    };

    // Intercept API calls
    cy.intercept('GET', '**/api/employees').as('getEmployees');
    cy.intercept('POST', '**/api/employees').as('createEmployee');

    // Visit the page and wait for initial load
    cy.visit('/');
    cy.wait('@getEmployees');

    // Click the Add Employee button
    cy.contains('button', 'Add Employee').should('be.visible').click();

    // Fill in the form
    cy.get('form').within(() => {
      // Fill each field and verify
      cy.get('input[name="firstName"]')
        .should('be.visible')
        .clear()
        .type(newEmployee.firstName)
        .should('have.value', newEmployee.firstName);

      cy.get('input[name="lastName"]')
        .should('be.visible')
        .clear()
        .type(newEmployee.lastName)
        .should('have.value', newEmployee.lastName);

      cy.get('input[name="age"]')
        .should('be.visible')
        .clear()
        .type(newEmployee.age)
        .should('have.value', newEmployee.age.toString());

      cy.get('input[name="city"]')
        .should('be.visible')
        .clear()
        .type(newEmployee.city)
        .should('have.value', newEmployee.city);

      cy.get('input[name="street"]')
        .should('be.visible')
        .clear()
        .type(newEmployee.street)
        .should('have.value', newEmployee.street);

      cy.get('input[name="department"]')
        .should('be.visible')
        .clear()
        .type(newEmployee.department)
        .should('have.value', newEmployee.department);

      // Submit the form
      cy.get('button[type="submit"]')
        .should('be.visible')
        .should('not.be.disabled')
        .click();
    });

    // Wait for the API call to complete
    cy.wait('@createEmployee').then((interception) => {
      expect(interception.response.statusCode).to.equal(201);
      expect(interception.response.body).to.include({
        firstName: newEmployee.firstName,
        lastName: newEmployee.lastName,
        department: newEmployee.department
      });
    });

    // Verify the modal is closed
    cy.get('form').should('not.exist');

    // Filter to find the new employee
    cy.get('input#nameFilter')
      .should('be.visible')
      .clear()
      .type(newEmployee.firstName);

    // Verify the employee appears in the table
    cy.get('table tbody tr')
      .should('have.length.at.least', 1)
      .first()
      .within(() => {
        cy.contains(newEmployee.firstName).should('be.visible');
        cy.contains(newEmployee.lastName).should('be.visible');
        // Look for uppercase department
        cy.contains(newEmployee.department.toUpperCase()).should('be.visible');
      });
  });

  it('should delete an employee successfully', () => {
    // Test data for the employee we'll delete
    const employeeToDelete = {
      firstName: 'John',
      lastName: 'Doe',
      department: 'Engineering'
    };

    // Intercept API calls
    cy.intercept('GET', '**/api/employees').as('getEmployees');
    cy.intercept('DELETE', '**/api/employees/*').as('deleteEmployee');

    // Visit the page and wait for initial load
    cy.visit('/');
    cy.wait('@getEmployees');

    // Filter to find our employee
    cy.get('input#nameFilter')
      .should('be.visible')
      .clear()
      .type(employeeToDelete.firstName);

    // Find and click delete button for our employee
    cy.get('table tbody tr')
      .first()
      .within(() => {
        // Verify it's the right employee before deleting
        cy.contains(employeeToDelete.firstName).should('be.visible');
        cy.contains(employeeToDelete.lastName).should('be.visible');
        cy.contains(employeeToDelete.department.toUpperCase()).should('be.visible');
        
        // Click the delete button
        cy.get('.delete-btn').should('be.visible').click();
      });

    // Handle the confirmation dialog
    cy.on('window:confirm', (text) => {
      expect(text).to.contains('Are you sure you want to delete this employee?');
      return true; // Click 'OK'
    });

    // Wait for the DELETE request to complete
    cy.wait('@deleteEmployee').then((interception) => {
      expect(interception.response.statusCode).to.equal(200);
    });

    // Clear the filter
    cy.get('input#nameFilter')
      .should('be.visible')
      .clear();

    // Verify the employee is no longer in the table
    cy.get('table tbody').then($tbody => {
      const text = $tbody.text();
      expect(text).not.to.include(employeeToDelete.firstName);
      expect(text).not.to.include(employeeToDelete.lastName);
    });
  });
}); 