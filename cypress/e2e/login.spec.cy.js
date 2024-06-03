describe('successful login',()=>{
    beforeEach(()=>{
        cy.visit('/');
        cy.on('uncaught:exception', () => {
            return false
        })
    });
    it('unsuccessful login',()=>{
        // validate the text beside the button is accurate.
        cy.get('[class="text-regular"]').should('be.visible').and('have.text','You have an account?');
        // click the sign in button
        cy.get('._secondary_button_ko0gw_3').click();
        // Enter unregistered email address
        cy.get('input[name="email"]').type('olufemii@gmail.com');
        // Enter invalid password
        cy.get('input[name="password"]').type('Hbon1234');
        // Click the sign in button
        cy.get('[type="submit"]').click();
        // Validate the error response
        cy.get('[type="submit"]').should('be.visible').and('have.text','Invalid email or password');

    })

    it('successful login',()=>{
        // validate the text beside the button is accurate.
        cy.get('[class="text-regular"]').should('be.visible').and('have.text','You have an account?');
        // click the sign in button
        cy.get('._secondary_button_ko0gw_3').click();
        // Enter registered email address
        cy.get('input[name="email"]').type('ohlufehmii@gmail.com');
        // Enter invalid password
        cy.get('input[name="password"]').type('Hbon@1234');
        // Click the sign in button
        cy.get('[type="submit"]').click();
        // Validate the error response
        cy.get('[type="submit"]').should('be.visible');

    })


})