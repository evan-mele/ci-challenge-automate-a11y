import { terminalLog } from '../../support/logAccessibiltyErrors';

describe( 'Home', () => {

    const a11yOptions = Cypress.config( 'a11yOptions' );

    before( () => {
        cy.visit( '/' );

         cy.injectAxe();
    });

    it('Has no detectable a11y violations on load', () => {
        cy.checkA11y( null, a11yOptions, terminalLog );
    })
});