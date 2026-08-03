describe('Black-Box/E2E Testing: Login Flow', () => {
  it('should successfully load the login page', () => {
    cy.visit('http://localhost:5173/login');
    cy.contains('Login').should('be.visible');
  });

  it('should login successfully as an Admin', () => {
    cy.visit('http://localhost:5173/login');

    // Click the Admin tab first
    cy.contains('Admin').click();

    // Type Admin credentials
    cy.get('input[type="email"]').type('admin@cvibe.com');
    cy.get('input[type="password"]').type('admin_123');

    // Click Login
    cy.contains('button', 'Login').click();

    // Verify Admin Dashboard redirect
    cy.url().should('include', '/admin-dashboard');
  });

  it('should login successfully as a regular User', () => {
    cy.visit('http://localhost:5173/login');

    // Click the User tab (it might be default, but clicking ensures correctness)
    cy.contains('User').click();

    // Type User credentials (replace with a real user email/password from your DB)
    cy.get('input[type="email"]').type('ramisatabassum8888@gmail.com');
    cy.get('input[type="password"]').type('123456'); // Update this password if needed

    // Click Login
    cy.contains('button', 'Login').click();

    // Verify User Dashboard redirect
    cy.url().should('include', '/dashboard');
  });
});