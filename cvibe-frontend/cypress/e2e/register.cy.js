describe('E2E Testing: Registration Flow', () => {
  it('should successfully open the registration form', () => {
    cy.visit('http://localhost:5173/login');
    cy.contains('Sign Up').click();
    
    cy.url().should('include', '/register'); 
  });

  it('should allow a new user to fill out the form and register', () => {
    cy.visit('http://localhost:5173/login');
    cy.contains('Sign Up').click();

    const randomEmail = `testuser${Date.now()}@cvibe.com`;

    cy.get('input[type="text"]').first().type('Test User Ramisa');
    cy.get('input[type="email"]').type(randomEmail);
    cy.get('input[type="password"]').type('testpass123456');

    // FIXED: Changed 'Sign Up' to 'Create Account' to match your UI
    cy.contains('button', 'Create Account').click();

    // Check if it redirects to the login page after successful registration
    cy.url().should('include', '/login'); 
  });
});