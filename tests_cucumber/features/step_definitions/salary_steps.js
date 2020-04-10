try {
    const supertest = require('supertest');
    const app = require('../../../RestPanda/newSalary');
    const expect = require('chai').expect;
    const nock = require('nock');
    const ajv = require('ajv')();
    const fs = require('fs');
    const { Given, When, Then } = require('cucumber');
    const CreateUserBuilder = require('../../builders/create_user_builder');

    const employeesBaseUrl = supertest('http://localhost:3000');
    const newSalaryBaseUrl = supertest('http://localhost:3001');


    const employees = '/employees';
    const newSalary = '/newSalary';
    let queryParams = {};
    let headers = {};
    const schema = fs.readFileSync('tests_cucumber/schemaFiles/newSalary.json', 'utf8');

    Given(/^(.*) has received a performance rating of (-?\d+)$/, async (employeeName, rating) => {

        queryParams = {
            employeeName: employeeName
        };

        headers = {
            performanceRating: rating,
            Accept: '/application/\json/'
        };

        this.createUserBody = new CreateUserBuilder()
            .populateDefaultFields()
            .withEmployeeName(employeeName)
            .withemailId('soniajasuja27@gmail.com')
            .withgender('female')
            .withtitle('manager')
            .withcurrentSalary(80000)
            .build();

        //specify the employees API url as it needs to be intercepted
        nock('http://localhost:3000')
            .log(console.log)
            //define the method to be intercepted
            .get(`${employees}/${employeeName}`)
            // .get('/users')
            //respond with a OK and the specified JSON response
            .reply(200, this.createUserBody);

    });

    When(/^I make a request to calculate the new salary$/, async () => {

        this.scenarioContext = await supertest('http://localhost:3001')
            .get(newSalary)
            .query(queryParams)
            .set(headers)

        // this.scenarioContext = await supertest('http://localhost:3000')
        //     .get(`${employees}/simit`)

        console.log('scenarioContext', this.scenarioContext.body);
    });

    Then(/^the new salary should be (-?\d+)$/, async (expSalary) => {
        await (expect(this.scenarioContext.body.newSalary).to.eql(expSalary));
    });

    Then(/^the status should be (-?\d+)$/, async (statusCode) => {
        expect(this.scenarioContext.status).to.eql(statusCode);
    });

    Then(/^the response should conform to the newSalary schema$/, async () => {
        let valid = ajv.validate(JSON.parse(schema), this.scenarioContext.body);
        expect(valid).to.eql(true, JSON.stringify(ajv.errors, null, 2))
    });

} catch (err) {
    console.log('err', err);
}
