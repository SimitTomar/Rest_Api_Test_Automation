const expect = require('chai').expect;
const axios = require('axios');

module.exports = async function (self, config, options) {

    try {
        const response = await axios(options);
        config.scenarioContext = response;
    } catch (err) {
        self.attach(JSON.stringify(options, null, 2), 'application/json');
        expect.fail(err);
    }
}