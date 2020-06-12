describe( 'Awards Page', () => {

    const a11yOptions = Cypress.config( 'a11yOptions' );
    const urlGoogle = 'https://google.com';
    const urlYahoo = 'https://yahoo.com';

    before( () => {
        cy.visit( '/' );

       cy.get( 'a[href=\'/awards\']' )
         .click()

         cy.injectAxe();
    });

    it( '[A11Y] Visits the awards page', () => {
        cy.checkA11y( null, { a11yOptions } )
    });

    it( 'Should contain a link to Google.com', () => {
        cy.get( 'a[href=\'' + urlGoogle + '\']' )
          .should( 'exist' )
          .should( 'be.visible' );
    });

    it( 'Should contain a link to Yahoo.com', () => {
        // cy.get( 'a[href=\'' + urlYahoo + '\']' )
        // .should( 'exist' )
        // .should( 'be.visible' );

        cy.checkA11y( '#employeeAwardsCerts', { a11yOptions } )
    });
});