describe('Navigation', () => {

    it('should show Dashboard', () => {
        cy.visit('/');
        cy.get('a[href="/2023/12"]').click();
        cy.get('[data-cy="page-title"]').should('have.text', 'Dashboard');
    })

    it('should show List', () => {
        cy.visit('/');
        cy.get('a[href="/list"]').click();
        cy.get('[data-cy="page-title"]').should('have.text', 'Liste des mouvements');
    })

    it('should show Add', () => {
        cy.visit('/');
        cy.get('a[href="/add"]').click();
        cy.get('[data-cy="page-title"]').should('have.text', 'Ajouter un mouvement');
    })

    it('should show NotFound', () => {
        cy.visit('/azerty');
        cy.get('[data-cy="page-title"]').should('have.text', '404 - Page non trouvée');
    })

})