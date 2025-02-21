/// <reference types="Cypress" />
context( 'Test developer console', () => {
    before( () => {
        cy.viewport(Cypress.env('width'), Cypress.env('height') );
        cy.visit( Cypress.env( 'QA_HOST' ) + 'console' ,{timeout:10000});
        cy.get( '#username', { timeout: 5000 } ).type( Cypress.env( 'USERNAME' ) );
        cy.get( '#password' ).type( Cypress.env( 'PASSWORD' ) );
        cy.get( '#submit',{timeout:10000} ).click({force:true});
    } );

    it( 'Check whether the app is already existing', () => {
        cy.wait(10000)
        cy.get( 'body' ).then( (body) => {
            if ( body.find( 'a[href^="/console/e2e-test-automation"]' ).length > 0 ) {
                cy.log('pop')
                cy.xpath( '//a//h2[text()="e2e test automation"]/ancestor::section/following-sibling::aside/descendant::button' ).click( { force: true } )
                cy.contains( 'Delete', { timeout: 10000 } ).click( { force: true } )
                  cy.get( '#delete-app', { timeout: 5000 } ).type( 'e2e test automation' );
        cy.contains( 'I understand the consequences, delete this app' ).click();
        cy.contains( 'App Deleted Successfully!' ).should( 'be.visible' );
            }
        })
    })
    it( 'Test for create the application', () => {
        cy.contains( 'Create new App', { timeout: 5000 } ).click();
        cy.get( '#app-name' ).type( 'e2e test automation' );
        cy.get( '#app-desc' ).type( 'e2e test automation' );
        cy.contains( 'Create App' ).click();
        cy.contains( 'App Created Successfully!' ,{timeout:60000}).should( 'be.visible' );
    } );

    it( 'Test for header section of feedback page', () => {
        cy.get( '.app-details--sidebar--main-nav' ).within( () => {
            cy.contains('Feedback').click();
        } )

    } );

    it( 'Test for feedback target header', () => {
               cy.get( 'h3').should( 'contain.text', 'User Feedback')
        } )

it( 'Click on Edit Feedback', () => {
    cy.xpath( "//button[normalize-space()='Edit Feedback Config']" ).click();
    })

    it( 'Test for feedback target help circle', () => {
        cy.get('[name=help-circle-outline]').click()
        cy.contains( 'The target where the feeback should be submitted as an issue or a ticket.' ).should('be.visible')
    } )

    it( 'Test for selecting feedback target and save it', () => {
        cy.get( '.pf-c-form' ).within( () => {
            cy.contains( 'JIRA' ).click()
            cy.get( '#projectKey' ).type( 'Test' )
            cy.get( '#feedbackEmail' ).type( 'test@redhat.com' )
            cy.get( '[aria-disabled="true"]' ).should( 'be.visible' );
            cy.contains( 'Save' ).click()
        } )
    })

    it( 'Test for update the application', () => {
        cy.wait(3000)
        cy.contains( 'App Settings' ,{timeout:40000}).click({force:true});
        cy.wait(3000)
        cy.get( '#name', { timeout: 50000 }).clear().type( 'e2e test automation update' );
        cy.contains( 'Save' ).click();
        cy.wait( 3000 )
        cy.contains( 'App Updated Successfully!' ).should( 'be.visible' );
    } );

    it( 'Test for delete the application', () => {
        cy.contains( 'Delete this App' ).click({force:true});
        cy.get( '#delete-app', { timeout: 50000 } ).type( 'e2e test automation update' );
        cy.contains( 'I understand the consequences, delete this app' ).click();
        cy.contains( 'App Deleted Successfully!' ).should( 'be.visible' );
    } );
} )
