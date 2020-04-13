const expect = require('chai').expect;
const axios = require('axios');

module.exports = async function (self, config, options) {

    await axios(options)
        .then(function (response) {
            config.scenarioContext = response;
        })
        .catch(function (err) {
            self.attach(JSON.stringify(options, null, 2), 'application/json');
            expect.fail(err);
        });

}