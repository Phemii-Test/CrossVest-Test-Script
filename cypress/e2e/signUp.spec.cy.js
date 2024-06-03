let inboxId
let emailAdress
let emailBody
describe('Sign up', ()=>{
    
        
    it('Verify Homescreen UI', ()=>{
        // verify that the homescreen icon is displayed
        cy.get('._img_cards_10acw_3 > img').should('be.visible');
        // Verify the Homescreen slogan is accurate.
        cy.get('._slogan_cards_10acw_8').should('be.visible').and('have.text',"Unlocking Africa's financial system for businesses");
        // verify homescreen header text
        cy.get('.text-h2').should('be.visible').and('have.text',"Sign In to your account");
        // Verify homescreen sub-header text
        cy.get('.opacity-50.text-regular').should('be.visible').and('have.text',"Enter your details to proceed further");
    // })

    // it('Verify the signup form', ()=>{
        // click signup button
        cy.get('._secondary_button_ko0gw_3').click();

        // Enter the first name
        cy.get('input[name="first_name"]').type('Olufemi');

        // Enter the first name
        cy.get('input[name="last_name"]').type('Omeiza');

        // Enter work email
        cy.mailslurp().then(mailslurp => mailslurp.createInbox())
        .then(inbox => {
            inboxId = inbox.id
            emailAdress = inbox.emailAddress
            cy.get('input[name="email"]').type(emailAdress)
        });
        

        // Enter company name
        cy.get('input[name="company_name"]').type('Metal Finance');
         // Select Nigeria country flag
         cy.get('div[role="button"]').click();
         cy.get('[class="flag ng"]').click();
        // Enter mobile number
         cy.get('input[name="phone"]').type('8140095998');
         // Enter password
         cy.get('input[name="password"]').type('Hbon@1234');
        //  Check the T&C
        cy.get('._unchecked_1jozr_30').click();
        // click signup button
        cy.get('._button_1eebr_3').click();

        // click verification link
        cy.mailslurp().then(Email => Email.waitForLatestEmail(inboxId, 60000, true))
        .then(email => {
            const emailBody = email.body;
            const extractor = new DOMParser();
            const doc = extractor.parseFromString(emailBody, "text/html");
            const link = doc.querySelector('a').href; // Extract the href attribute

            // Visit the verification link
            cy.visit(link);

            // click login button
            cy.get('[type="button"]').should('be.visible').click();
            cy.get('input[name="email"]').type(emailAdress)
            cy.get('[placeholder="Password"]').type('Hbon@1234');
            cy.get('[type="submit"]').click();
            cy.wait(5000);
          
            // Enter OTP
            cy.mailslurp().then(Email => Email.waitForLatestEmail(inboxId, 60000, true))
        .then(email => {
           const emailBody = email.body
            const extractor = new DOMParser()
            const doc = extractor.parseFromString(emailBody, "text/html")
            const otpText = doc.querySelector('body > p:nth-of-type(2)').textContent
            const otp = otpText.replace(/\D/g, '').trim();

            cy.get('[placeholder="OTP Code"]').type(otp)
        });
        cy.get('[type="submit"]').click();
                        
});

});
});