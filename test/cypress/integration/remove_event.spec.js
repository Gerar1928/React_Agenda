describe('Removing an event.', () => {
    before(() => {
        cy.visit('http://localhost:3000/')
    });

    it('If there is not an event then we create a new one and right then delete it', () => {
        cy.get('.events').then($eventsContainer => {
            if (!$eventsContainer.children('.event').length) {
                // Opening modal.
                cy.get('.daysContainer').within(() => cy.get('.currentMonth:first').click());
                cy.get('.options').within(() => cy.get('.add-event').should('have.class', 'active').click());

                // Filling inputs fields.
                cy.get('.modal').should('have.class', 'active').within(() => {
                    cy.get('[name="event-name"]').click().type('Testing');
                    cy.get('[name="event-description"]').click().type('Testing from cypress...');
                    cy.get('button').contains('Submit Event').click();
                });
            } else {
                // Removing element.
                cy.get('.events').within(() => cy.get('.event').last().click('bottomRight'));
                cy.get('.options').within(() => cy.get('.remove-event').should('have.class', 'active').click());
                cy.get('.confirmation-modal').should('have.class', 'active')
                    .within(() => cy.get('[type="submit"]').click());            }
        });
    });
});
