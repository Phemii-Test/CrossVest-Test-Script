const { defineConfig } = require("cypress");

module.exports = defineConfig({

  e2e: {
  
    baseUrl:"https://mutual-fund.uat.secondstax.com/",
    defaultCommandTimeout:20000,
    watchForFileChanges:false,
    chromeWebSecurity: false,
    env: {
      "MAILSLURP_API_KEY":"238dbc0bcd01f3c8b7d4cd42b91b7a80b8af2cf4e5fd7487c311f089562dc43a"
   },
    setupNodeEvents(on, config) {
      
    },
  },
});
