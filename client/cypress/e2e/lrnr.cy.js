describe('LRNR Homepage', () => {
  const baseUrl = 'http://localhost:5173/';

  it('loads homepage and shows hero content', () => {
    cy.visit(baseUrl);

    // App logo
    cy.get('img.applogo').should('be.visible');

    // Main tagline <h3>
    cy.contains('h3', 'Your guided path to programming enlightenment')
      .should('be.visible');

    // "Begin Journey" button
    cy.contains('button', 'Begin Journey').should('be.visible');
  });

  it('navigates to the quiz page when clicking "Begin Journey"', () => {
    cy.visit(baseUrl);

    cy.contains('button', 'Begin Journey').click();

    // URL includes /quiz
    cy.url().should('include', '/quiz');

    // Adjust this text to whatever is actually on your quiz page:
    cy.contains(/quiz/i).should('exist'); 
  });
});
