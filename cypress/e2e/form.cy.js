/// <reference types="cypress" />

describe('Form Data', () => {
  const formData = [
    { label: 'Student Name', value: 'Cowlar Developer' },
    { label: 'Student Email', value: 'qaengineer@cowlar.com' },
    { label: 'Gender', value: 'Male' },
    { label: 'Mobile', value: '0123456789' },
    { label: 'Subjects', value: 'Computer Science' },
    { label: 'Hobbies', value: 'Music' },
    { label: 'Address', value: 'Address 1' },
    { label: 'State and City', value: 'NCR Delhi' },
  ]

  beforeEach(() => {
    cy.visit('/')
  })

  it('should submit the form and verify the user data', () => {
    cy.once('uncaught:exception', () => false)

    // navigating to Form Page
    cy.contains('h5', 'Forms').click()
    cy.contains('span', 'Practice Form').click()

    // Filling up Form
    cy.get('#firstName').type('Cowlar')
    cy.get('#lastName').type('Developer')
    cy.get('#userEmail').type('qaengineer@cowlar.com')
    cy.get('[for=gender-radio-1]').click()
    cy.get('#userNumber').type('0123456789')
    cy.get('#subjectsInput').type('C')
    cy.get("[tabindex='-1']").contains('div', 'Computer Science').click()
    cy.get('[for=hobbies-checkbox-3]').and('contain.text', 'Music').click()
    cy.get('#currentAddress').type('Address 1')
    cy.get('#state').click()
    cy.get("[tabindex='-1']").contains('div', 'NCR').click()
    cy.get('#city').click()
    cy.get("[tabindex='-1']").contains('div', 'Delhi').click()
    cy.get('#submit').click()

    cy.log('All giving data is submited')

    // Verifying Modal is visible
    cy.get('.modal-title').should('be.visible')

    // Verifying all value is correct
    formData.forEach(({ label, value }) => {
      cy.get('tr')
        .find('td')
        .contains(label)
        .parent('tr')
        .find('td')
        .contains(value)
        .should('be.visible')
    })
    cy.log('Verified all user data')

    // Close Modal
    cy.get('#closeLargeModal').click()

    cy.log('Model is closed')
  })
})
