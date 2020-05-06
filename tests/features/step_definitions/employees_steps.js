const { Given, When, Then } = require('cucumber');
const fs = require('fs');
const chai = require('chai');
const { expect } = chai;
const deepEqualInAnyOrder = require('deep-equal-in-any-order');
const ajv = require('ajv')();
const { employeesBase, employeesPath } = require('../../endpoints/endpoints.js');
const schema = fs.readFileSync('tests/schema_files/employees.json', 'utf8');

const EmployeesPostRequestBodyBuilder = require('../../builders/employees_request_body_builder');
const sendRequest = require('../support/send_request');
const expectedJsonResponses = fs.readFileSync('tests/expected_response/employees.json', 'utf8');

Given('I have a new employee with details as {string}, {string}, {string}, {string} and {int}', async function (employeeName, email, gender, title, salary) {
    
    this.employeesPostRequestBody = [new EmployeesPostRequestBodyBuilder()
        .withEmployeeName(employeeName)
        .withEmailId(email)
        .withGender(gender)
        .withTitle(title)
        .withCurrentSalary(salary)
        .build()];
});

Given('I have a new employee with details as {string}, {string}, {string} and {int}', async function (employeeName, email, title, salary) {
    
    this.employeesPostRequestBody = [new EmployeesPostRequestBodyBuilder()
        .withEmployeeName(employeeName)
        .withEmailId(email)
        .withTitle(title)
        .withCurrentSalary(salary)
        .build()];
});

When('I make a request to create the employee', async function () {
    let options = {
        method: 'post',
        url: `${employeesBase}${employeesPath}`,
        data: this.employeesPostRequestBody
    };

    await sendRequest(this, options);
});

Given('I make a request to create the following employees', async function (dataTable) {
    this.employeesPostRequestBody = dataTable.hashes();
});

When('I make a request to retrieve the employees with title as {string}', async function (title) {
    let options = {
        method: 'get',
        url: `${employeesBase}${employeesPath}/`,
        params: {
            title: title
        }
    };

    await sendRequest(this, options);
});

When('I make a request to retrieve the employee details for {string}', async function (employeeName) {
    let options = {
        url: `${employeesBase}${employeesPath}/${employeeName}?delay=0.5`,
    };

    await sendRequest(this, options);
});

When('I make a request to update the title of {string} to {string}', async function (employeeName, newTitle) {
    this.employeesPostRequestBody[0].title = newTitle;

    let options = {
        method: 'put',
        url: `${employeesBase}${employeesPath}/${employeeName}`,
        data: this.employeesPostRequestBody[0]
    };

    await sendRequest(this, options);
});

When('I make a request to delete the details of {string}', async function (employeeName) {
    let options = {
        method: 'delete',
        url: `${employeesBase}${employeesPath}/${employeeName}`
    };

    await sendRequest(this, options);
});

Then('the status as {int}', async function (status) {
    await (expect(this.response.status).to.eql(status));
});

Then('I should have a new employee created with name as {string}', async function (employeeName) {
    await (expect(this.response.data[0].message).to.eql(`${employeeName} employee created`));
});

Then('I should have an employee with details as {string}, {string}, {string}, {string} and {int}', async function (employeeName, email, gender, title, salary) {
    await (expect(this.response.data.employeeName).to.eql(employeeName));
    await (expect(this.response.data.emailId).to.eql(email));
    await (expect(this.response.data.gender).to.eql(gender));
    await (expect(this.response.data.title).to.eql(title));
    await (expect(this.response.data.currentSalary).to.eql(salary));
});

Then('the retrieved list of employees should match with the expected {string}', async function (scenarioKey) {
    let actualData = this.response.data;
    let expectedData = JSON.parse(expectedJsonResponses)[scenarioKey];

    actualData.forEach(element => {
        delete element._id;
        delete element.createdAt;
        delete element.updatedAt;
    });

    expectedData.forEach(element => {
        delete element._id;
        delete element.createdAt;
        delete element.updatedAt;
    });

    chai.use(deepEqualInAnyOrder);
    await expect(actualData).to.deep.equalInAnyOrder(expectedData);
});

When('the details for {string} should no longer exist', async function (employeeName) {
    let options = {
        url: `${employeesBase}${employeesPath}/${employeeName}`,
        validateStatus: null
    };

    await sendRequest(this, options);
    await expect(this.response.data.message).to.eql(`Employee not found with employeeName ${employeeName}, note that employeeName is a case senstive field`);
});

Then('the response should conform to the employees schema', async function () {
    let valid = ajv.validate(JSON.parse(schema), this.response.data);
    expect(valid).to.eql(true, JSON.stringify(ajv.errors, null, 2))
});