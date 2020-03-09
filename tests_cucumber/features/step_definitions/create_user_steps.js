try {
    const supertest = require('supertest');
    const expect = require('chai').expect;
    const CreateUserBuilder = require('../../builders/create_user_builder');
    const { Given, When, Then } = require('cucumber');

    const baseURL = supertest("http://localhost:3000/");
    const list_users = "employees";
    let id;

    Given(/^I have a new employee with details as (.*), (.*), (.*), (.*), (-?\d+) and (-?\d+)$/, async (name, email, gender, title, salary, experience) => {
        this.createUserBody =  new CreateUserBuilder()
            .populateDefaultFields()
            .withname(name)
            .withemailId(email)
            .withgender(gender)
            .withtitle(title)
            .withcurrentSalary(salary)
            .withexperience(experience)
            .build();
    });

    When(/^I make a request to add the employee$/, async () => {
        this.scenarioContext = await baseURL.post(list_users)
        .type('form')
        .send(this.createUserBody)
        .set('Accept','/application/\json/');
        // await (console.log('New User', this.scenarioContext.body));

    });

    When(/^I make a request to get the employee details$/, async () => {
        
        this.scenarioContext = await baseURL.get(list_users+ '/' + this.scenarioContext.body._id)
        // await (console.log('Existing User', this.scenarioContext.body));

    });


    When(/^I make a request to get all employee details$/, async () => {
        
        this.scenarioContext = await baseURL.get(list_users)
        // await (console.log('Existing Users', this.scenarioContext.body));

    });

    When(/^I make a request to update the title to (.*)$/, async (newTitle) => {
        this.scenarioContext.body.title = newTitle;

        this.scenarioContext = await baseURL.put(list_users + '/' + this.scenarioContext.body._id)
            .type('form')
            .send(this.scenarioContext.body)
        .set('Accept','/application/\json/');
        // await (console.log('Amended User', this.scenarioContext.body));

    });

    When(/^I make a request to delete the employee details$/, async () => {
        id = this.scenarioContext.body._id;
        this.scenarioContext = await baseURL.delete(list_users+ '/' + this.scenarioContext.body._id)
        // await (console.log('Deleting User', this.scenarioContext.body));

    });

    Then(/^the status as (-?\d+)$/, async (statusCode) => {
        await (expect(this.scenarioContext.status).to.eql(statusCode));
    });

    Then(/^I should have an employee with details as (.*), (.*), (.*), (.*), (-?\d+) and (-?\d+)$/, async (name, email, gender, title, salary, experience) => {
        await (expect(this.scenarioContext.body.name).to.eql(name));
        await (expect(this.scenarioContext.body.emailId).to.eql(email));
        await (expect(this.scenarioContext.body.gender).to.eql(gender));
        await (expect(this.scenarioContext.body.title).to.eql(title));
        await (expect(this.scenarioContext.body.currentSalary).to.eql(salary));
        await (expect(this.scenarioContext.body.experience).to.eql(experience));
    });

    When(/^the employee should no longer exist$/, async () => {
        
        this.scenarioContext = await baseURL.get(list_users + '/' + id)
        await (expect(this.scenarioContext.body.message).to.eql('Customer not found with id ' + id));

    });


} catch (err) {
    console.log('err', err);
}
