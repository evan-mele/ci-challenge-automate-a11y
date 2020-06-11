describe( 'Feedback Page', () => {

    const a11yOptions = Cypress.config( 'a11yOptions' );

    before( () => {
        cy.visit( '/' );

       cy.get( 'a[href=\'/feedback\']' )
         .click()

         cy.injectAxe();
    });

    it( '[A11Y] Visits the feedback page', () => {
        cy.checkA11y( null, { a11yOptions } )
    });

    it( '[A11Y] Displays the Feedback Form ', () => {
        cy.get( 'button' )
          .click();

        // cy.get( '#feedback_modal *' )
        //   .each( ($el, index, $list) => {
        //       cy.log( $el )
        //       cy.checkA11y( $el, { a11yOptions } );
        //   });
          
        cy.checkA11y( '#feedback_modal *', { a11yOptions } );
    });

    it( 'Completes and Submits the Feedback Form ', () => {
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