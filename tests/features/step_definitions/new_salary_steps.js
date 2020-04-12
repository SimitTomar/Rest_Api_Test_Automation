const { Given, When, Then } = require('cucumber');
const fs = require('fs');
const rp = require('request-promise-native');
const expect = require('chai').expect;
const ajv = require('ajv')();
const argv = require('yargs').argv;
const mockServerClient = require('mockserver-client').mockServerClient;

const urlList = require('../../endpoints/endpoints.js');
const employeesBaseUrl = urlList.employees.base;
const employeesPath = urlList.employees.path;
const newSalaryBaseUrl = urlList.newSalary.base;
const newSalaryPath = urlList.newSalary.path;

const schema = fs.readFileSync('tests/schemaFiles/newSalary.json', 'utf8');

const Config = require('../support/config');
const config = new Config()
const CreateUserBuilder = require('../../builders/create_user_builder');


let queryParams = {},
    headers = {};

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

        let self = this;

        let options = {
            method: 'POST',
            uri: `${employeesBaseUrl}${employeesPath}`,
            body: config.createUserBody,
            json: true,
            resolveWithFullResponse: true
        };
    
        await rp(options)
            .then(function (parsedBody) {
                config.scenarioContext = parsedBody;
            })
            .catch(function (err) {
                self.attach(JSON.stringify(options, null, 2), 'application/json');
                expect.fail(err);
            });
    }
});

Given(/^(.*) has received a performance rating of (-?\d+)$/, async function (employeeName, rating) {
    queryParams = {
        employeeName: employeeName
    };

    headers = {
        performanceRating: rating,
        Accept: '/application/\json/'
    };
});

When(/^I make a request to calculate the new salary$/, async function () {

    let self = this;

    let options = {
        uri: `${newSalaryBaseUrl}${newSalaryPath}`,
        qs: queryParams,
        headers:headers,
        json: true,
        resolveWithFullResponse: true
    };

    await rp(options)
        .then(function (parsedBody) {
            config.scenarioContext = parsedBody;
        })
        .catch(function (err) {
            self.attach(JSON.stringify(options, null, 2), 'application/json');
            expect.fail(err);
        });
});

Then(/^the new salary should be (-?\d+)$/, async function (expSalary) {
    await (expect(config.scenarioContext.body.newSalary).to.eql(expSalary));
});

Then(/^the status should be (-?\d+)$/, async function (statusCode) {
    expect(config.scenarioContext.statusCode).to.eql(statusCode);
});

Then(/^the response should conform to the newSalary schema$/, async function () {
    let valid = ajv.validate(JSON.parse(schema), config.scenarioContext.body);
    expect(valid).to.eql(true, JSON.stringify(ajv.errors, null, 2))
});