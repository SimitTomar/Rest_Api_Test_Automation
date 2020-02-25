try {
    const supertest = require('supertest');
    const expect = require('chai').expect;
    const nock = require('nock');
    const CreateUserBuilder = require('../../builder/create_user_builder');
    const CreateUserDirector = require('../../director/create_user_director');
    const { Given, When, Then } = require('cucumber');

    const baseURL = supertest("https://reqres.in");
    const list_users = "/api/users";

    Given(/^I have the required details to create a new application user$/, async () => {

        this.createUserBody =  new CreateUserBuilder()
            .populateDefaultFields()
            .withFirstName('Simit11')
            .build();
    });

    When(/^I make a request for user creation$/, async () => {
        
        this.scenarioContext = await baseURL.post(list_users)
        .type('form')
        .send(this.createUserBody)
        .set('Accept','/application/\json/');

        await (console.log('New User', this.scenarioContext.body));

    });


    Then(/^I should be able to create a new user$/, async () => {

        await (expect(this.scenarioContext.status).to.eql(201));

    });

} catch (err) {
    console.log('err', err);
}
