const { Given, When, Then } = require('cucumber');
const fs = require('fs');
const expect = require('chai').expect;
const ajv = require('ajv')();
const argv = require('yargs').argv;
const mockServerClient = require('mockserver-client').mockServerClient;


const {employeesBase, employeesPath, newSalaryBase, newSalaryPath} = require('../../endpoints/endpoints.js');
const schema = fs.readFileSync('tests/schemaFiles/newSalary.json', 'utf8');

const Config = require('../support/config');
const config = new Config()
const CreateUserBuilder = require('../../builders/create_user_builder');
const sendRequest = require('../support/sendRequest');


let queryParams = {};
let headers = {};

Given(/^I have an employee with details as (.*), (.*), (.*), (.*) and (-?\d+)$/, async function (employeeName, email, gender, title, salary) {
    config.createUserBody = new CreateUserBuilder()
        .populateDefaultFields()
        .withEmployeeName(employeeName)
        .withemailId(email)
        .withgender(gender)
        .withtitle(title)
        .withcurrentSalary(salary)
        .build();
    
    if (argv.env == 'mock') {
        await mockServerClient("localhost", 3000)
                .mockAnyResponse({
                    'httpRequest': {
                        'method': 'GET',
                        'path': `${employeesPath}/${employeeName}`
                    },
                    'httpResponse': {
                        'statusCode': 200,
                        'body': config.createUserBody,
                    },
                    'times': {
                        'remainingTimes': 1,
                        'unlimited': false
                    }
                }).then(() => {
                    console.log("expectation created");
                }).catch(error => {
                    console.log(error);
                });
    } else {

        let options = {
            method: 'post',
            url: `${employeesBase}${employeesPath}`,
            data: config.createUserBody
        };

        await sendRequest(this, config, options);
    }
});

Given(/^(.*) has received a performance rating of (-?\d+)$/, async function (employeeName, rating) {
    queryParams = {
        employeeName: employeeName
    };

    headers = {
        performanceRating: rating
    };
});

When(/^I make a request to calculate the new salary$/, async function () {

    let options = {
        url: `${newSalaryBase}${newSalaryPath}?employeeName=${queryParams.employeeName}`,
        headers:headers
    };

    await sendRequest(this, config, options);
});

Then(/^the new salary should be (-?\d+)$/, async function (expSalary) {
    await (expect(config.scenarioContext.data.newSalary).to.eql(expSalary));
});

Then(/^the status should be (-?\d+)$/, async function (status) {
    expect(config.scenarioContext.status).to.eql(status);
});

Then(/^the response should conform to the newSalary schema$/, async function () {
    let valid = ajv.validate(JSON.parse(schema), config.scenarioContext.data);
    expect(valid).to.eql(true, JSON.stringify(ajv.errors, null, 2))
});