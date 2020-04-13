const { Given, When, Then } = require('cucumber');
const fs = require('fs');
const expect = require('chai').expect;
const ajv = require('ajv')();

const { employeesBase, employeesPath } = require('../../endpoints/endpoints.js');
const schema = fs.readFileSync('tests/schemaFiles/employees.json', 'utf8');

const Config = require('../support/config');
const config = new Config();
const CreateUserBuilder = require('../../builders/create_user_builder');
const sendRequest = require('../support/sendRequest');


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

    let options = {
        method: 'post',
        url: `${employeesBase}${employeesPath}`,
        data: config.createUserBody
    };

    await sendRequest(this, config, options);

});

When(/^I make a request to get the employee details for (.*)$/, async function (employeeName) {

    let options = {
        url: `${employeesBase}${employeesPath}/${employeeName}?delay=1`,
    };

    await sendRequest(this, config, options);
});

When(/^I make a request to update the title of (.*) to (.*)$/, async function (employeeName, newTitle) {

    config.scenarioContext.data.title = newTitle;

    let options = {
        method: 'put',
        url: `${employeesBase}${employeesPath}/${employeeName}`,
        data: config.scenarioContext.data
    };

    await sendRequest(this, config, options);
});

When(/^I make a request to delete the details of (.*)$/, async function (employeeName) {

    let options = {
        method: 'delete',
        url: `${employeesBase}${employeesPath}/${employeeName}`
    };

    await sendRequest(this, config, options);
});

Then(/^the status as (-?\d+)$/, async function (status) {
    await (expect(config.scenarioContext.status).to.eql(status));
});

Then(/^the response should conform to the employees schema$/, async function () {
    let valid = ajv.validate(JSON.parse(schema), config.scenarioContext.data);
    expect(valid).to.eql(true, JSON.stringify(ajv.errors, null, 2))
});

Then(/^I should have an employee with details as (.*), (.*), (.*), (.*) and (-?\d+)$/, async function (employeeName, email, gender, title, salary) {

    await (expect(config.scenarioContext.data.employeeName).to.eql(employeeName));
    await (expect(config.scenarioContext.data.emailId).to.eql(email));
    await (expect(config.scenarioContext.data.gender).to.eql(gender));
    await (expect(config.scenarioContext.data.title).to.eql(title));
    await (expect(config.scenarioContext.data.currentSalary).to.eql(salary));
});

When(/^the details for (.*) should no longer exist$/, async function (employeeName) {

    let options = {
        url: `${employeesBase}${employeesPath}/${employeeName}`,
        validateStatus: null
    };

    await sendRequest(this, config, options);
    await expect(config.scenarioContext.data.message).to.eql(`Employee not found with employeeName ${employeeName}, note that employeeName is a case senstive field`);

});
