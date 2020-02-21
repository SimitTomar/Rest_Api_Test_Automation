const assertDiff = require('assert-diff');
const config = require('../../../../conf/local.conf.js').config;
const aut = require('../../../../builders/applicationUnderTest/sampleSoapApiRequestBuilder');
const apiLib = require('tang-js-api-lib').restApiLib;
const expectedResults = require('../../../../files/expectedResponseFiles/' + config.app + '/sampleSoapApiResponse').expectedResponses;
let apiResponse;
assertDiff.options.strict = true;

module.exports = function () {

  this.Then(/^I fetch the response from Country API by specifying (.*) and (.*) and method as (.*)$/, (header, queryParameter, method) => {
    apiResponse = aut.getAPIResponse(header, queryParameter, method)
    apiLib.setApplicationLogs('API RESPONSE DETAILS', apiResponse);
  });

  this.Then(/^the retrieved details should match with the response from expected result file (.*)$/, (expectedResultKey) => {
    assertDiff.deepEqual(expectedResults.getResponse(expectedResultKey), apiResponse);
  });
};