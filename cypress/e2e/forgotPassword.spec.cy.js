let inboxId = '33bcfa16-ab0f-414c-bf18-a15e5fd4459c'
let emailAdress
let emailBody
let otpValue

describe('successful login',()=>{
    beforeEach(()=>{
        cy.visit('/');
        cy.on('uncaught:exception', () => {
            return false
        })
    });

    it('request password reset for an invalid email.', ()=>{
    
        // click forgot password button
        cy.get('[href="/forgot-password"]').click();
        // enter unrecognized email address
        cy.get('input[name="email"]').type('olufehmi@gmail.com');
        // click the continue button
        cy.get('[type="submit"]').click();
        // Validate the error response
        cy.get('._errors_1kfa0_14').should('be.visible').and('have.text',"can't find user");

    })

    it('request password reset for a valid email.', ()=>{
        
        // click forgot password button
        cy.get('[href="/forgot-password"]').click();
        // enter recognized email address
        cy.mailslurp().then((mailslurp) => {
            return mailslurp.getInbox(inboxId);
        })
            .then(inbox => {
                emailAdress = inbox.emailAddress
        cy.get('input[name="email"]').type(emailAdress);
            });
        // click the continue button
        cy.get('[type="submit"]').click();
        // Validate next screen
        cy.get('.text-h2').should('be.visible').and('have.text','Recovery Email Sent');

        

    })


})