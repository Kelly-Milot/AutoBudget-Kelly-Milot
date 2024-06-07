describe('Dashboard', () => {

    it('should have fiscal value for 2023-12', () => {
        cy.visit('/2023/12');

        cy.get('[data-cy="fiscal"]').should('have.text', '19850');
    })

    it('should have saving capacity value for 2023-12', () => {
        cy.visit('/2023/12');

        cy.get('[data-cy="saving"]').should('have.text', '806');
    })

    it('should have analyse table for 2023-12', () => {
        cy.visit('/2023/12');

        cy.get('[data-cy="analyse"]').children().should('have.length', 6);
    })

    it('should have error for 2020-01', () => {
        cy.visit('/2020/01');

        cy.get('[data-cy="error"]').should('have.text', 'Erreur !');
    })

})