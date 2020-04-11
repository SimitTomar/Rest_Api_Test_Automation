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

    Given(/^I make a request to remove details of all the employees$/, async () => {
        if (argv.env == 'real') {
            this.scenarioContext = await employeesBaseUrl.get(employeesPath)

            for (let i = 0; i < this.scenarioContext.body.length; i++)
                await employeesBaseUrl.delete(employeesPath + '/' + this.scenarioContext.body[i].employeeName)
        }
    });

    Given(/^I have a new employee with details as (.*), (.*), (.*), (.*) and (-?\d+)$/, async (employeeName, email, gender, title, salary) => {
        this.createUserBody = new CreateUserBuilder()
            .populateDefaultFields()
            .withEmployeeName(employeeName)
            .withemailId(email)
            .withgender(gender)
            .withtitle(title)
            .withcurrentSalary(salary)
            .build();
    });

    When(/^I make a request to add the employee$/, async () => {
        this.scenarioContext = await employeesBaseUrl.post(employeesPath)
            .type('form')
            .send(this.createUserBody)
            .set('Accept', '/application/\json/');
        // await (console.log('New User', this.scenarioContext.body));
    });

    When(/^I make a request to get the employee details for (.*)$/, async (employeeName) => {
        // Also shows the example of Delayed Response
        this.scenarioContext = await employeesBaseUrl.get(`${employeesPath}/${employeeName}?delay=5`)
        // await (console.log('Existing User', this.scenarioContext.body));
    });

    When(/^I make a request to update the title of (.*) to (.*)$/, async (employeeName, newTitle) => {
        this.scenarioContext.body.title = newTitle;

        this.scenarioContext = await employeesBaseUrl.put(employeesPath + '/' + employeeName)
            .type('form')
            .send(this.scenarioContext.body)
            .set('Accept', '/application/\json/');
        // await (console.log('Amended User', this.scenarioContext.body));
    });

    When(/^I make a request to delete the details of (.*)$/, async (employeeName) => {
        this.scenarioContext = await employeesBaseUrl.delete(employeesPath + '/' + employeeName).expect(200);
        // await (console.log('Deleting User', this.scenarioContext.body));
    });

    Then(/^the status as (-?\d+)$/, async (statusCode) => {
        await (expect(this.scenarioContext.status).to.eql(statusCode));
    });

    Then(/^the response should conform to the employees schema$/, async () => {
        let valid = ajv.validate(JSON.parse(schema), this.scenarioContext.body);
        expect(valid).to.eql(true, JSON.stringify(ajv.errors, null, 2))
    });

    Then(/^I should have an employee with details as (.*), (.*), (.*), (.*) and (-?\d+)$/, async (employeeName, email, gender, title, salary) => {
        await (expect(this.scenarioContext.body.employeeName).to.eql(employeeName));
        await (expect(this.scenarioContext.body.emailId).to.eql(email));
        await (expect(this.scenarioContext.body.gender).to.eql(gender));
        await (expect(this.scenarioContext.body.title).to.eql(title));
        await (expect(this.scenarioContext.body.currentSalary).to.eql(salary));
    });

    When(/^the details for (.*) should no longer exist$/, async (employeeName) => {
        this.scenarioContext = await employeesBaseUrl.get(employeesPath + '/' + employeeName)
        await (expect(this.scenarioContext.body.message).to.eql('Employee not found with employeeName ' + employeeName + ', note that employeeName is a case senstive field'));
    });


} catch (err) {
    console.log('err', err);
}
