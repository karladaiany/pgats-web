/// <reference types="cypress" />
/**
// describe / context - suite ou conjunto de testes em um mesmo arquivo
// iit - um teste dentro de um bloco ou conjunto de testes

// describe → Automation Exercise
// it → Cadastrar um usuário
// it → Teste abcde
*/

describe('Automation Exercise', () => {
    it('Cadastrar um usuário', () => {
        const timestamp = new Date().getTime()
        
        cy.visit('https://automationexercise.com')

        cy.get('a[href="/login"]').click()

        cy.get('[data-qa="signup-name"]').type('QA Tester')
        cy.get('[data-qa="signup-email"]').type(`qa-tester-${timestamp}@test.com`)
        
        cy.contains('button', 'Signup').click()

        // radio ou checkboxes → check
        // cy.get('#id_gender1').check()
        cy.get('input[type=radio]').check('Mrs')

        cy.get('input#password').type('12345', {log: false})

        // para comboboxes ou selects → select
        cy.get('[data-qa=days]').select('20')
        cy.get('[data-qa=months]').select('September')
        cy.get('[data-qa=years]').select('1990')

        // radio ou checkboxes → check
        cy.get('input[type=checkbox]#newsletter').check()
        cy.get('input[type=checkbox]#optin').check()

        cy.get('input#first_name').type('QA')
        cy.get('input#last_name').type('Tester')
        cy.get('input#company').type('PGATS')
        cy.get('[data-qa="address"]').type('Avenida Selenium, n 2004')
        cy.get('select#country').type('Canada')
        cy.get('input#state').type('California')
        cy.get('input#city').type('Los Angeles')
        cy.get('[data-qa="zipcode"]').type('90001')
        cy.get('[data-qa="mobile_number"]').type('111 222 333')

        cy.get('[data-qa=create-account]').click()

        // Assert
        cy.url().should('include', 'account_created')

        cy.contains('b', 'Account Created!').should('be.visible')

        // consulta ao banco api


    })    

})