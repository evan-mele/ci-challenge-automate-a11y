describe( 'About Page', () => {

    const a11yOptions = Cypress.config( 'a11yOptions' );
    const urlGoogle = 'https://google.com';
    const urlGithub = 'https://github.com';

    before( () => {
        cy.visit( '/' );
        cy.get( 'a[href=\'/about\']' )
          .click();

        cy.injectAxe();
    });

    it( '[A11Y] Visits the About Page', () => {
        cy.checkA11y( null, { a11yOptions } )
    });

    it( 'Should contain a link to Google.com', () => {
        cy.get( 'a[href=\'' + urlGoogle + '\']' )
          .should( 'exist' )
          .should( 'be.visible' );
    });

    it( 'Should contain a link to Github.com', () => {
        cy.get( 'a[href=\'' + urlGithub + '\']' )
          .should( 'exist' )
          .should( 'be.visible' );
    });
});