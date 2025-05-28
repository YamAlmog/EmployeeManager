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
}); 