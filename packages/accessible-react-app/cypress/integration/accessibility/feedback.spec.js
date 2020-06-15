import { terminalLog } from '../../support/logAccessibiltyErrors';

describe( 'Feedback Page', () => {

    const a11yOptions = Cypress.config( 'a11yOptions' );

    before( () => {
        cy.visit( '/' );

       cy.get( 'a[href=\'/feedback\']' )
         .click()

         cy.injectAxe();
    });

    it( '[A11Y] Visits the feedback page', () => {
        cy.checkA11y( null, a11yOptions, terminalLog )
    });

    it( '[A11Y] Displays the Feedback Form', () => {
        cy.get( 'button' )
          .click();
          
        cy.checkA11y( '#feedback_modal *', a11yOptions, terminalLog );
    });

    it( 'Completes and Submits the Feedback Form', () => {
        cy.get( '#first_name' )
          .type( 'Jane' );

        cy.get( '#last_name' )
          .type( 'Doe' );  

        cy.get( '#email' )
          .type( 'janedoe@hotmail.com' );  

        cy.get( '#feedback' )
          .type( 'Cypress-Axe library helps discover common accessibility issues on web applications!' );   

        cy.get( '#rate_good' )
          .click();  
              
        cy.get( '#submitForm' )
          .click();
    });
});