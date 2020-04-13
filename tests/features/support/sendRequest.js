const rp = require('request-promise-native');
const expect = require('chai').expect;

module.exports = async function (self, config, options) {

    await rp(options)
        .then(function (parsedBody) {
            config.scenarioContext = parsedBody;
        })
        .catch(function (err) {
            self.attach(JSON.stringify(options, null, 2), 'application/json');
            expect.fail(err);
        });

}