// let inboxId = '33bcfa16-ab0f-414c-bf18-a15e5fd4459c'
let emailAdress
let emailBody
describe('successful login',()=>{
    beforeEach(()=>{
        cy.visit('/');
        cy.on('uncaught:exception', () => {
            return false
        })
    });
    it('unsuccessful login',()=>{
        // validate the text beside the button is accurate.
        cy.get('[class="text-regular"]').should('be.visible').and('have.text',"You don't have an account?")
          // Enter unregistered email address
        cy.get('input[name="email"]').type('olufemii@gmail.com');
        // Enter invalid password
        cy.get('input[name="password"]').type('Hbon1234');
        // Click the sign in button
        cy.get('[type="submit"]').click();
        // Validate the error response
        cy.get('._errors_1p5uz_14').should('be.visible').and('have.text','email or password is incorrect');

    })

    it('successful login',()=>{
        var inboxId = '33bcfa16-ab0f-414c-bf18-a15e5fd4459c';
        
        // validate the text beside the button is accurate.
        cy.get('[class="text-regular"]').should('be.visible').and('have.text',"You don't have an account?");

        // Enter valid email address
        cy.mailslurp().then(mailslurp => {
           
            return mailslurp.getInbox(inboxId);
        })
        .then(inbox => {
            const emailAdress = inbox.emailAddress;
            cy.get('input[name="email"]').type(emailAdress);

            // Enter invalid password
        cy.get('input[name="password"]').type('Hbon@1234');
        // Click the sign in button
        cy.get('[type="submit"]').click();

        // Enter OTP
        cy.mailslurp().then(mailslurp => {
            return mailslurp.emptyInbox(inboxId);
        });
        cy.mailslurp().then(Email => Email.waitForLatestEmail(inboxId, 60000, true))
        .then(email => {
           const emailBody = email.body
            const extractor = new DOMParser()
            const doc = extractor.parseFromString(emailBody, "text/html")
            const otpText = doc.querySelector('body > p:nth-of-type(2)').textContent
            const otp = otpText.replace(/\D/g, '').trim();

            cy.get('[placeholder="OTP Code"]').type(otp)
            console.log(otp);
        });
        cy.get('[type="submit"]').click();
        });
        
        

    })


})