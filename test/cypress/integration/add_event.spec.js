describe('Adding an event', () => {
    before(() => {
        cy.visit('http://localhost:3000/')
    });

    it('Opening modal', () => {
        cy.get('.daysContainer').within(() => cy.get('.currentMonth:first').click());
        cy.get('.options').within(() => cy.get('.add-event').should('have.class', 'active').click());
    });

    it('Filling input fields', () => {
        cy.get('.modal').should('have.class', 'active').within(() => {
            cy.get('[name="event-name"]').click().type('Testing');
            cy.get('[name="event-description"]').click().type('Testing from cypress...');
            cy.get('button').contains('Submit Event').click();
        });

        cy.get('.events').within(() => cy.get('.event').last().should('have.attr', 'data-id'));
    });
});
