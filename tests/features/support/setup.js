const supertest = require('supertest');
const argv = require('yargs').argv;
const employeesBaseUrl = supertest("http://localhost:3000/");
const employeesPath = "employees";
const { BeforeAll } = require('cucumber');

BeforeAll(async function () {
    if (argv.env !== 'mock') {
        scenarioContext = await employeesBaseUrl.get(employeesPath)

        for (let i = 0; i < scenarioContext.body.length; i++)
            await employeesBaseUrl.delete(employeesPath + '/' + scenarioContext.body[i].employeeName)
    }
});
