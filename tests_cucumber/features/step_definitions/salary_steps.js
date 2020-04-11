try {
    const supertest = require('supertest');
    const expect = require('chai').expect;
    const ajv = require('ajv')();
    const fs = require('fs');
    const { Given, When, Then } = require('cucumber');
    const CreateUserBuilder = require('../../builders/create_user_builder');
    const newSalaryBaseUrl = supertest('http://localhost:3001');

    const employees = '/employees';
    const newSalary = '/newSalary';
    let queryParams = {};
    let headers = {};
    const schema = fs.readFileSync('tests_cucumber/schemaFiles/newSalary.json', 'utf8');

    let mockServerClient = require('mockserver-client').mockServerClient;


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


        await mockServerClient("localhost", 3000)
            .mockAnyResponse({
                'httpRequest': {
                    'method': 'GET',
                    'path': `${employees}/${employeeName}`
                },
                'httpResponse': {
                    'statusCode': 200,
                    'body': this.createUserBody,
                },
                'times': {
                    'remainingTimes': 1,
                    'unlimited': false
                }
            }).then(
                function () {
                    console.log("expectation created");
                },
                function (error) {
                    console.log(error);
                }
            );


    });

    When(/^I make a request to calculate the new salary$/, async () => {

        this.scenarioContext = await newSalaryBaseUrl
            .get(newSalary)
            .query(queryParams)
            .set(headers)

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
