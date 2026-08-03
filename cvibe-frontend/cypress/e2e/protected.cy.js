describe('Security Testing: Protected Routes', () => {
  it('should block guest users from accessing the User Dashboard', () => {
    // Attempting to access the User Dashboard directly
    cy.visit('http://localhost:5173/dashboard');

    // Checking if the system blocks the guest and redirects them to the login page
    cy.url().should('include', '/login');
  });

  it('should block guest users from accessing the Admin Dashboard', () => {
    // Attempting to access the Admin Dashboard directly
    cy.visit('http://localhost:5173/admin-dashboard');

    // Checking if the system blocks the guest and redirects them to the login page
    cy.url().should('include', '/login');
  });
});