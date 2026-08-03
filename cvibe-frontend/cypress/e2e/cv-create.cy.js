describe('E2E Testing: Complete CV Creation Flow', () => {
  beforeEach(() => {
    // Login and navigate to the dashboard
    cy.visit('http://localhost:5173/login');
    cy.contains('User').click();
    cy.get('input[type="email"]').type('ramisatabassum8888@gmail.com');
    cy.get('input[type="password"]').type('123456');
    cy.contains('button', 'Login').click();
  });

  it('should create a complete CV by filling all tabs and running an ATS Audit', () => {
    // Navigate to the CV Builder page
    cy.contains('+ New CV').click();

    // --- 1. PERSONAL TAB ---
    cy.get('input[placeholder="e.g. Your Name"]').type('Ramisa Tabassum');
    cy.get('input[placeholder="e.g. Software Engineer | Fresh Graduate"]').type('Frontend Developer Intern');
    cy.get('input[placeholder="your@email.com"]').type('ramisatabassum@cvibe.com');
    cy.get('input[placeholder="+880 1700 000000"]').type('+8801700123456');
    cy.get('input[placeholder="Chittagong, Bangladesh"]').type('Chittagong, Bangladesh');

    // --- 2. EDUCATION TAB ---
    cy.contains('Education').click();
    cy.get('input[placeholder="e.g. BSc in Computer Science and Engineering"]').type('BSc in Computer Science');
    cy.get('input[placeholder="International Islamic University Chittagong"]').type('IIUC');
    cy.get('input[placeholder="2020"]').type('2020');
    cy.get('input[placeholder="2024 / Present"]').type('2024');
    cy.get('input[placeholder="3.72 / 4.00"]').type('3.85');

    // --- 3. EXPERIENCE TAB ---
    cy.contains('Experience').click();
    cy.get('input[placeholder="e.g. Frontend Developer Intern"]').type('React Developer');
    cy.get('input[placeholder="e.g. Tech Company Ltd"]').type('Tech BD');
    cy.get('input[placeholder="Jan 2023"]').type('Jan 2024');
    cy.get('input[placeholder="Jun 2023 / Present"]').type('Present');
    cy.get('textarea[placeholder="Describe what you did and the impact you made..."]').type('Developed the main UI components using React and Tailwind CSS.');

    // --- 4. SKILLS TAB ---
    cy.contains('Skills').click();
    // Typing a skill and pressing Enter to add the tag
    cy.get('input[placeholder="Type a skill and press Enter"]').type('React{enter}');
    cy.get('input[placeholder="Type a skill and press Enter"]').type('Cypress{enter}');

    // --- 5. ATS AUDIT TAB ---
    cy.contains('ATS Audit').click();
    // Click the AI Scan button
    cy.contains('Scan CV Authenticity & Rules').click();
    // Wait a bit for the AI scan to process (optional but good for visual testing)
    cy.wait(2000); 

    // --- 6. SAVE CV ---
    // Click the Save CV button on the top right
    cy.contains('button', 'Save CV').click();
  });
});