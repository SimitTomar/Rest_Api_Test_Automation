const axios = require('axios');
const { argv } = require('yargs');
const { employeesBase, employeesPath } = require('../../endpoints/endpoints.js');
const { BeforeAll } = require('cucumber');

BeforeAll(async function () {
    let employeesList;
    if (argv.env !== 'mock') {

        let options = {
            url: `${employeesBase}${employeesPath}`
        };

        await axios(options)
            .then(function (response) {
                employeesList = response.data;
            })
            .catch(function (err) {
                throw new Error(err);
            });

        for (let i = 0; i < employeesList.length; i++) {

            let options = {
                method: 'delete',
                url: employeesBase + employeesPath + '/' + employeesList[i].employeeName
            };

            await axios(options)
                .then(function () {
                    'Setup successfull!!'
                })
                .catch(function (err) {
                    if (err.response) {
                        console.log('Employees deleted successfully');
                    } else if (err.request) {
                        throw new Error(err.request);
                    } else {
                        throw new Error(err);
                    }
                });
        }
    }
});