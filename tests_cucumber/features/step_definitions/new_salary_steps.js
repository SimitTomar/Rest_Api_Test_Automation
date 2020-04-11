try {
    const supertest = require('supertest');
    const expect = require('chai').expect;
    const ajv = require('ajv')();
    const fs = require('fs');
    const argv = require('yargs').argv;
    const { Given, When, Then } = require('cucumber');
    const CreateUserBuilder = require('../../builders/create_user_builder');
    const employeesBaseUrl = supertest('http://localhost:3000');
    const newSalaryBaseUrl = supertest('http://localhost:3001');

    const employeesPath = '/employees';
    const newSalaryPath = '/newSalary';
    const mockServerClient = require('mockserver-client').mockServerClient;
    const schema = fs.readFileSync('tests_cucumber/schemaFiles/newSalary.json', 'utf8');

    let queryParams = {},
        headers = {};

    Given(/^I have an employee with details as (.*), (.*), (.*), (.*) and (-?\d+)$/, async (employeeName, email, gender, title, salary) => {
        this.createUserBody = new CreateUserBuilder()
            .populateDefaultFields()
            .withEmployeeName(employeeName)
            .withemailId(email)
            .withgender(gender)
            .withtitle(title)
            .withcurrentSalary(salary)
            .build();

        if (argv.env == 'mock') {
            return new Promise((resolve, reject) => {
                mockServerClient("localhost", 3000)
                    .mockAnyResponse({
                        'httpRequest': {
                            'method': 'GET',
                            'path': `${employeesPath}/${employeeName}`
                        },
                        'httpResponse': {
                            'statusCode': 200,
                            'body': this.createUserBody,
                        },
                        'times': {
                            'remainingTimes': 1,
                            'unlimited': false
                        }
                    }).then(data => {
                        console.log("expectation created");
                        resolve();
                    }).catch(error => {
                        console.log(error);
                        reject();
                    });
            })
        } else {
            this.scenarioContext = await employeesBaseUrl.post(employeesPath)
                .type('form')
                .send(this.createUserBody)
                .set('Accept', '/application/\json/')
                .expect(201);
        }
    });

    Given(/^(.*) has received a performance rating of (-?\d+)$/, async (employeeName, rating) => {
        queryParams = {
            employeeName: employeeName
        };

        headers = {
            performanceRating: rating,
            Accept: '/application/\json/'
        };
    });

    When(/^I make a request to calculate the new salary$/, async () => {
        this.scenarioContext = await newSalaryBaseUrl
            .get(newSalaryPath)
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