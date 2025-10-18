/// <reference types="cypress" />
/**
// describe / context - suite ou conjunto de testes em um mesmo arquivo
// iit - um teste dentro de um bloco ou conjunto de testes

// describe → Automation Exercise
// it → Cadastrar um usuário
// it → Teste abcde
*/

import userData from '../fixtures/example.json'
import {
    getRandomEmail,
    getRandomNumber,
    getRandomBirthDate
} from '../support/helpers'
import { faker } from '@faker-js/faker'

describe('Automation Exercise', () => {
    
    beforeEach(() => {
        cy.visit('https://automationexercise.com')
    });

    it.only('Cadastrar um usuário', () => {
        const timestamp = new Date().getTime()
        
        cy.get('a[href="/login"]').click()

        cy.get('[data-qa="signup-name"]').type(userData.name)
        cy.get('[data-qa="signup-email"]').type(getRandomEmail())
        
        cy.contains('button', 'Signup').click()

        // radio ou checkboxes → check
        // cy.get('#id_gender1').check()
        cy.get('input[type=radio]').check('Mrs')

        cy.get('input#password').type('12345', {log: false})

        // para comboboxes ou selects → select
        cy.get('[data-qa=days]').select(getRandomBirthDate().day)
        cy.get('[data-qa=months]').select(getRandomBirthDate().month)
        cy.get('[data-qa=years]').select(getRandomBirthDate().year)

        // radio ou checkboxes → check
        cy.get('input[type=checkbox]#newsletter').check()
        cy.get('input[type=checkbox]#optin').check()

        cy.get('input#first_name').type(faker.person.firstName())
        cy.get('input#last_name').type(faker.person.lastName())
        cy.get('input#company').type(faker.company.name())
        cy.get('[data-qa="address"]').type(faker.location.streetAddress())
        cy.get('select#country').type(faker.location.country())
        cy.get('input#state').type(faker.location.state())
        cy.get('input#city').type(faker.location.city())
        cy.get('[data-qa="zipcode"]').type(faker.location.zipCode())
        cy.get('[data-qa="mobile_number"]').type(faker.phone.number())

        cy.get('[data-qa=create-account]').click()

        // Assert
        cy.url().should('include', 'account_created')

        cy.contains('b', 'Account Created!').should('be.visible')

        // consulta ao banco api


    })    

    it('Enviar um Formulário de contato com upload de arquivo', () => {
        // Arrange - Act - Assert
        cy.get('a[href="/contact_us"]').click()
        
        cy.get('input[data-qa="name"]').type(userData.name)
        cy.get('input[data-qa="email"]').type(getRandomEmail())
        cy.get('input[data-qa="subject"]').type(userData.subject)
        cy.get('textarea[data-qa="message"]').type(userData.message)

        cy.fixture('example.json').as('arquivo')
        cy.get('input[name="upload_file"]').selectFile('@arquivo')

        cy.get('input[data-qa="submit-button"]').click()
        
        // Asserts
        cy.get('.status').should('be.visible')
        cy.get('.status').should('have.text', 'Success! Your details have been submitted successfully.')
    });
})