const { Given, When, Then } = require('cucumber');
const fs = require('fs');
const rp = require('request-promise-native');
const expect = require('chai').expect;
const ajv = require('ajv')();

const urlList = require('../../endpoints/endpoints.js');
const employeesBaseUrl = urlList.employees.base;
const employeesPath = urlList.employees.path;
const schema = fs.readFileSync('tests/schemaFiles/employees.json', 'utf8');

const Config = require('../support/config');
const config = new Config()
const CreateUserBuilder = require('../../builders/create_user_builder');


Given(/^I have a new employee with details as (.*), (.*), (.*), (.*) and (-?\d+)$/, async function (employeeName, email, gender, title, salary) {
    config.createUserBody = new CreateUserBuilder()
        .populateDefaultFields()
        .withEmployeeName(employeeName)
        .withemailId(email)
        .withgender(gender)
        .withtitle(title)
        .withcurrentSalary(salary)
        .build();
});

When(/^I make a request to add the employee$/, async function () {

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
});

When(/^I make a request to get the employee details for (.*)$/, async function (employeeName) {

    let self = this;

    let options = {
        uri: `${employeesBaseUrl}${employeesPath}/${employeeName}?delay=1`,
        qs: {
            delay: 1
        },
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

When(/^I make a request to update the title of (.*) to (.*)$/, async function (employeeName, newTitle) {

    config.scenarioContext.body.title = newTitle;

    let self = this;

    let options = {
        method: 'PUT',
        uri: `${employeesBaseUrl}${employeesPath}/${employeeName}`,
        body: config.scenarioContext.body,
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

When(/^I make a request to delete the details of (.*)$/, async function (employeeName) {

    let self = this;

    let options = {
        method: 'DELETE',
        uri: `${employeesBaseUrl}${employeesPath}/${employeeName}`,
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

Then(/^the status as (-?\d+)$/, async function (statusCode) {
    await (expect(config.scenarioContext.statusCode).to.eql(statusCode));
});

Then(/^the response should conform to the employees schema$/, async function () {
    let valid = ajv.validate(JSON.parse(schema), config.scenarioContext.body);
    expect(valid).to.eql(true, JSON.stringify(ajv.errors, null, 2))
});

Then(/^I should have an employee with details as (.*), (.*), (.*), (.*) and (-?\d+)$/, async function (employeeName, email, gender, title, salary) {
    await (expect(config.scenarioContext.body.employeeName).to.eql(employeeName));
    await (expect(config.scenarioContext.body.emailId).to.eql(email));
    await (expect(config.scenarioContext.body.gender).to.eql(gender));
    await (expect(config.scenarioContext.body.title).to.eql(title));
    await (expect(config.scenarioContext.body.currentSalary).to.eql(salary));
});

When(/^the details for (.*) should no longer exist$/, async function (employeeName) {

    let self = this;

    let options = {
        uri: `${employeesBaseUrl}${employeesPath}/${employeeName}`,
        json: true,
        resolveWithFullResponse: true,
        simple: false
    };

    await rp(options)
        .then(async function (parsedBody) {
            config.scenarioContext = parsedBody;
            await (expect(config.scenarioContext.body.message).to.eql('Employee not found with employeeName ' + employeeName + ', note that employeeName is a case senstive field'));
        })
        .catch(function (err) {
            self.attach(JSON.stringify(options, null, 2), 'application/json');
            expect.fail(err);
        });
});
