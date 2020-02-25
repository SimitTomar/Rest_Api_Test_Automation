try {
    const supertest = require('supertest');
    const expect = require('chai').expect;
    // const schema = require('../validation/list_users_schema');
    // const joi = require('joi');
    const nock = require('nock');
    // const ScenarioContext = require('../support/scenario_context');

    // let scenarioContext = new ScenarioContext();

    const { Given, When, Then } = require('cucumber');

    let baseURL = supertest("https://reqres.in");
    let list_users = "/api/users?page=2";

    Given(/^I have the access to registered users$/, () => {

        //specify the url to be intercepted
        nock("https://reqres.in")
            //define the method to be intercepted
            .get('/api/users?page=2')
            //respond with a OK and the specified JSON response
            .reply(200, {
                "status": 200,
                "message": "This is a mocked response"
            });

    });

    When(/^I fetch the User list$/, async () => {

        //perform the request to the api which will now be intercepted by nock
        this.scenarioContext = await baseURL.get(list_users); //Sending the GET request
        console.log('User List', this.scenarioContext.body);

    });


    Then(/^I should get all the registered users$/, async () => {

        // // Validate the Response Status Code
        await expect(this.scenarioContext.body.status).to.equal(200);
        // // Validate the Response Schema
        // // await (expect(joi.validate(schema.schema).error).to.be.null);
        // // Validate the Response Body
        // await (expect(scenarioContext.value.body.page).to.equal(2));

    });

} catch (err) {
    console.log('err', err);
}
