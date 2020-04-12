const rp = require('request-promise-native');
const argv = require('yargs').argv;
const urlList = require('../../endpoints/endpoints');
const employeesBaseUrl = urlList.employees.base;
const employeesPath = urlList.employees.path;
const { BeforeAll } = require('cucumber');

BeforeAll(async function () {
    let employeesList;
    if (argv.env !== 'mock') {

        let options = {
            method: 'GET',
            uri: `${employeesBaseUrl}${employeesPath}`,
            json: true,
            resolveWithFullResponse: true
        };

        await rp(options)
            .then(function (parsedBody) {
                employeesList = parsedBody.body;
            })
            .catch(function (err) {
                throw new Error(err);
            });

        for (let i = 0; i < employeesList.length; i++) {

            let options = {
                method: 'DELETE',
                uri: employeesBaseUrl + employeesPath + '/' + employeesList[i].employeeName,
                json: true,
                resolveWithFullResponse: true
            };

            await rp(options)
                .then({})
                .catch(function (err) {
                    throw new Error(err);
                });
        }
    }
});
