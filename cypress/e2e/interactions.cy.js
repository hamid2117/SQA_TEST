/// <reference types="cypress" />

describe('Resizable Box', () => {
  beforeEach(() => {
    cy.visit('/')
    cy.contains('span', 'TOOLSQA.COM').should('be.visible')
    cy.log('Page is open')
  })
  it('should resize the box', () => {
    cy.once('uncaught:exception', () => false)

    cy.contains('h5', 'Interactions').click()

    // Verifying Sidebar tabs
    const texts = [
      'Elements',
      'Forms',
      'Alerts, Frame & Windows',
      'Widgets',
      'Interactions',
      'Book Store Application',
    ]
    cy.get('.header-text').should(($els) => {
      texts.forEach((text) => {
        expect($els).to.contain(text)
      })
    })
    cy.contains('span', 'Resizable').click()
    cy.get('.main-header').contains('Resizable').should('be.visible')

    // Verify the initial size of the resizable box element
    cy.get('#resizableBoxWithRestriction')
      .should('have.css', 'height')
      .and('be.closeTo', 200, 0.01)
    cy.get('#resizableBoxWithRestriction')
      .should('have.css', 'width')
      .and('be.closeTo', 200, 0.01)

    // Trigger a resize event on the resizable box element
    cy.get('#resizableBoxWithRestriction .react-resizable-handle-se')
      .trigger('mousedown', { button: 0 })
      .trigger('mousemove', { clientX: 1, clientY: 2 })
      .trigger('mouseup', { force: true })

    // Verify the size of the resizable box element after resizing
    cy.get('#resizableBoxWithRestriction')
      .should('have.css', 'height')
      .and('be.closeTo', 150, 0.01)
    cy.get('#resizableBoxWithRestriction')
      .should('have.css', 'width')
      .and('be.closeTo', 150, 0.01)
    cy.log('Min width and height is 150')

    // Verify the size of the parent div element of the resizable box element
    cy.get('#resizableBoxWithRestriction')
      .parent('div')
      .should('have.css', 'height')
      .and('be.closeTo', 300, 0.01)
    cy.get('#resizableBoxWithRestriction')
      .parent('div')
      .should('have.css', 'width')
      .and('be.closeTo', 500, 0.01)

    // Verify that the resizable box element has relative positioning
    cy.get('#resizable').invoke('css', 'position').should('equal', 'relative')
  })
})
