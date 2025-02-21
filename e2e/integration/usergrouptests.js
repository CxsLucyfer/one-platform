/// <reference types="Cypress" />
context( 'Test for UserGroup', () => {

    before( () => {
        cy.viewport(Cypress.env('width'), Cypress.env('height') );
        cy.visit( Cypress.env( 'QA_HOST' ) + 'user-groups/',{timeout:10000} );
        cy.get( '#username', { timeout: 5000 } ).type( Cypress.env( 'USERNAME' ) );
        cy.get( '#password' ).type( Cypress.env( 'PASSWORD' ) );
        cy.get( '#submit' ,{timeout:10000}).click();
    } );

    it( 'Test for top header section', () => {
        cy.get( '.app' ).within( () => {
            cy.get( '.opc-header' ).within( () => {
                cy.get( '.opc-header__top-row--header-name' ).should( 'contain.text', 'User Group SPA' )
                })
            })
    } );

    it( 'Test for bottom header section', () => {
        cy.get( '.app' ).within( () => {
            cy.get( '.opc-header' ).within( () => {
                cy.get( '.opc-header__bottom-row' ).should( 'be.visible' );
            } );
        } )
    })

    it( 'Test for search user group by name', () => {
        cy.get( '#searchText' ).type( 'dsal-admin' )
        cy.get( 'tbody' ).within( () => {
            cy.get( '[data-label^="LDAP"]' ).first().should( 'have.text','dsal-admin')
        })
    } )

    it( 'Test for the headers of the table', () => {
        cy.get( 'tr' ).within( () => {
            cy.get( '[data-label="Group Name"]' ).should( 'be.visible' )
            cy.get( '[data-label="LDAP/Rover Common Name"]' ).should( 'be.visible' )
       })
    } )

    it( 'Test for add new group', () => {
        cy.get( 'a[href="/user-groups/group/new"]' ).click()
        cy.get( '[data-ouia-component-type="PF4/Button"]' ).should( 'be.disabled' )
        cy.get( '#groupName' ).type( 'test automation' )
        cy.get( '[aria-label="Search input"]' ).type( 'test' )
        cy.get( '[data-ouia-component-type="PF4/Button"]' ).should( 'not.be.disabled' )
    } )

    it( 'Test for trying to add new group with existing name', () => {
        cy.get( '.pf-c-breadcrumb__item  a[href="/user-groups"]' ).click()
        cy.get( '#username', { timeout: 5000 } ).type( Cypress.env( 'USERNAME' ) );
        cy.get( '#password' ).type( Cypress.env( 'PASSWORD' ) );
        cy.get( '#submit' ).click();
        cy.get( 'a[href="/user-groups/group/new"]' ).click();
        cy.get( '#groupName' ).type( 'test1' );
        cy.get( '[aria-label="Search input"]' ).type( 'one - portal - devel' );
        cy.xpath( '//button[normalize-space()="Add Group"]' ).click({force:true});
        cy.contains( 'Could not create the group').should('be.visible')
    } )

    it( 'Edit a User Profile Group Test', () => {
        cy.get( '.pf-c-breadcrumb__item  a[href="/user-groups"]' ).click()
        cy.get( '#username', { timeout: 5000 } ).type( Cypress.env( 'USERNAME' ) );
        cy.get( '#password' ).type( Cypress.env( 'PASSWORD' ) );
        cy.get( '#submit' ).click();
        cy.xpath( "//tbody/tr[2]/td[1]/a" ).click( { force: true } )
        cy.contains( 'Edit Group' ).click( { force: true } )
        cy.contains( 'Update Group' ).click( { force: true } )



    })

   //Test for my profile
    it( 'Test for my profile name', () => {
        cy.contains( 'My Profile' ).click();
        cy.get( '.pf-c-toolbar__item' ).should( 'have.text', 'one-portal-test sso-tester' );
    })

    it( 'Test for my profile title', () => {
            cy.get( '.pf-c-description-list__group' ).first().within( () => {
                cy.get( '.pf-c-description-list__term' ).should( 'have.text', 'Title' );
            } );
    } )

    it( 'Test for my profile Email', () => {
            cy.get( '.pf-c-description-list__group' ).eq( 1 ).within( () => {
                cy.get( '.pf-c-description-list__term' ).should( 'have.text', 'Email' );
                cy.get( '.pf-c-description-list__description' ).should( 'have.text', 'one-portal-test@redhat.com' );
            } );
    } )

        it( 'Test for my profile Kerberos ID', () => {
            cy.get( '.pf-c-description-list__group' ).eq( 2 ).within( () => {
                cy.get( '.pf-c-description-list__term' ).should( 'have.text', 'Kerberos ID' );
                cy.get( '.pf-c-description-list__description' ).should( 'have.text', 'one-portal-test' );
            } );
        } )

    it( 'Test for my profile Rover Group', () => {
        cy.get( '.pf-c-description-list__group' ).eq( 3 ).within( () => {
            cy.get( '.pf-c-description-list__term' ).should( 'have.text', 'Rover Groups' );
        } );
    } )

    it( 'Test for my profile Authorization Section', () => {
        cy.get( '.pf-c-accordion' ).should( 'have.text', 'Authorization & API PermissionsUnder Development' );
    })
})
