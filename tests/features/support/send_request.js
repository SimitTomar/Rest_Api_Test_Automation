const { expect } = require('chai');
const axios = require('axios');

module.exports = async function (self, options) {

    try {
        self.response = await axios(options);
    } catch (err) {
        self.attach(JSON.stringify(options, null, 2), 'application/json');
        expect.fail(err);
    }
}