try {
    const supertest = require('supertest');
    const expect = require('chai').expect;
    const CreateUserBuilder = require('../../builders/create_user_builder');
    const { Given, When, Then } = require('cucumber');
    const ajv = require('ajv')();
    const fs = require('fs');
    const argv = require('yargs').argv;

    const employeesBaseUrl = supertest("http://localhost:3000/");
    const employeesPath = "employees";
    const schema = fs.readFileSync('tests_cucumber/schemaFiles/employees.json', 'utf8');

    const Config = require('../support/config');
    const config = new Config()

    Given(/^I make a request to remove details of all the employees$/, async function () {
        if (argv.env == 'real') {
            config.scenarioContext = await employeesBaseUrl.get(employeesPath)

            for (let i = 0; i < config.scenarioContext.body.length; i++)
                await employeesBaseUrl.delete(employeesPath + '/' + config.scenarioContext.body[i].employeeName)
        }
    });

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
        config.scenarioContext = await employeesBaseUrl.post(employeesPath)
            .type('form')
            .send(config.createUserBody)
            .set('Accept', '/application/\json/');

        this.attach(JSON.stringify(config.scenarioContext.request, null, 2), 'application/json');
        // await (console.log('New User', config.scenarioContext.body));
    });

    When(/^I make a request to get the employee details for (.*)$/, async function (employeeName) {
        // Also shows the example of Delayed Response
        // config.scenarioContext = await employeesBaseUrl.get(`${employeesPath}/${employeeName}?delay=5`)
        // await (console.log('Existing User', config.scenarioContext.body));
    });

    When(/^I make a request to update the title of (.*) to (.*)$/, async function (employeeName, newTitle) {
        config.scenarioContext.body.title = newTitle;

        config.scenarioContext = await employeesBaseUrl.put(employeesPath + '/' + employeeName)
            .type('form')
            .send(config.scenarioContext.body)
            .set('Accept', '/application/\json/');

            this.attach(JSON.stringify(config.scenarioContext.request, null, 2), 'application/json');
        // await (console.log('Amended User', config.scenarioContext.body));
    });

    When(/^I make a request to delete the details of (.*)$/, async function (employeeName) {
        config.scenarioContext = await employeesBaseUrl.delete(employeesPath + '/' + employeeName).expect(200);
        // await (console.log('Deleting User', config.scenarioContext.body));
    });

    Then(/^the status as (-?\d+)$/, async function (statusCode) {
        await (expect(config.scenarioContext.status).to.eql(statusCode));
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
        config.scenarioContext = await employeesBaseUrl.get(employeesPath + '/' + employeeName)
        await (expect(config.scenarioContext.body.message).to.eql('Employee not found with employeeName ' + employeeName + ', note that employeeName is a case senstive field'));
    });


} catch (err) {
    console.log('err', err);
}
