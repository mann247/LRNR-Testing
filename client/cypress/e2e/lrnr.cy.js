describe('LRNR Homepage', () => {
  const baseUrl = 'http://localhost:5173/';

  it('loads homepage and shows hero content', () => {
    cy.visit(baseUrl);


    cy.get('img.applogo').should('be.visible');

  
    cy.contains('h3', 'Your guided path to programming enlightenment')
      .should('be.visible');


    cy.contains('button', 'Begin Journey').should('be.visible');
  });

  it('navigates to the quiz page when clicking "Begin Journey"', () => {
    cy.visit(baseUrl);

    cy.contains('button', 'Begin Journey').click();

  
    cy.url().should('include', '/quiz');
  
    cy.contains(/quiz/i).should('exist'); 
  });
});
