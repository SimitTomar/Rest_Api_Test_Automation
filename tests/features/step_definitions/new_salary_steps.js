const { Given, When, Then } = require('cucumber');
const fs = require('fs');
const { expect } = require('chai');
const ajv = require('ajv')();
const { argv } = require('yargs');
const mockServerClient = require('mockserver-client').mockServerClient;


const { employeesBase, employeesPath, newSalaryBase, newSalaryPath } = require('../../endpoints/endpoints.js');
const schema = fs.readFileSync('tests/schemaFiles/newSalary.json', 'utf8');

const CreateUserBuilder = require('../../builders/create_user_builder');
const sendRequest = require('../support/sendRequest');


Given('I have an employee with details as {string}, {string}, {string}, {string} and {int}', async function (employeeName, email, gender, title, salary) {
    this.createEmployeesBody = [new CreateUserBuilder()
        .populateDefaultFields()
        .withEmployeeName(employeeName)
        .withemailId(email)
        .withgender(gender)
        .withtitle(title)
        .withcurrentSalary(salary)
        .build()];

    if (argv.env == 'mock') {
        await mockServerClient("localhost", 3000)
            .mockAnyResponse({
                'httpRequest': {
                    'method': 'GET',
                    'path': `${employeesPath}/${employeeName}`
                },
                'httpResponse': {
                    'statusCode': 200,
                    'body': this.createEmployeesBody[0],
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
            data: this.createEmployeesBody
        };

        await sendRequest(this, options);
    }
});

Given('{string} has received a performance rating of {int}', async function (employeeName, performanceRating) {
    this.employeeName = employeeName;
    this.performanceRating = performanceRating;
});

When('I make a request to calculate the new salary', async function () {
    let options = {
        url: `${newSalaryBase}${newSalaryPath}`,
        headers: {
            performanceRating: this.performanceRating
        },
        params: {
            employeeName: this.employeeName
        }
    };

    await sendRequest(this, options);
});

Then('the new salary should be {int}', async function (expSalary) {
    await (expect(this.response.data.newSalary).to.eql(expSalary));
});

Then('the status should be {int}', async function (status) {
    expect(this.response.status).to.eql(status);
});

Then('the response should conform to the newSalary schema', async function () {
    let valid = ajv.validate(JSON.parse(schema), this.response.data);
    expect(valid).to.eql(true, JSON.stringify(ajv.errors, null, 2))
});