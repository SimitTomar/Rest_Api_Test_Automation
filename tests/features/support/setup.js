const rp = require('request-promise-native');
const argv = require('yargs').argv;
const {employeesBase, employeesPath} = require('../../endpoints/endpoints.js');
const { BeforeAll } = require('cucumber');

BeforeAll(async function () {
    let employeesList;
    if (argv.env !== 'mock') {

        let options = {
            method: 'GET',
            uri: `${employeesBase}${employeesPath}`,
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
                uri: employeesBase + employeesPath + '/' + employeesList[i].employeeName,
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