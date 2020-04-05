try {
    const supertest = require('supertest');
    const expect = require('chai').expect;
    const ajv = require('ajv')();
    const fs = require('fs');
    const { Given, When, Then } = require('cucumber');

    const baseURL = supertest("http://localhost:3000/");
    const salary = "newSalary";
    let queryParams = {};
    let headers = {};
    const schema = fs.readFileSync('tests_cucumber/schemaFiles/newSalary.json', 'utf8');

    Given(/^(.*) has received a performance rating of (-?\d+)$/, async (name, rating) => {
        
        queryParams = {
            employeeName: name
        };

        headers = {
            performanceRating: rating,
            Accept: '/application/\json/'
        }; 
    
    });

    When(/^I make a request to calculate the new salary$/, async () => {
        this.scenarioContext = await baseURL
            .get(salary)
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
