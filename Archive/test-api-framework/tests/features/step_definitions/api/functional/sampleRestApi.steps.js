const chai = require('chai');
const expect = chai.expect;
const assertDiff = require('assert-diff');
const config = require('../../../../conf/local.conf.js').config;
const mockApplication = require('../../../../builders/mockApplication/sampleMockRequestBuilder');
const aut = require('../../../../builders/applicationUnderTest/sampleRestApiRequestBuilder');
const expectedResults = require('../../../../files/expectedResponseFiles/' + config.app + '/sampleRestApiResponse').expectedResponses;
const apiLib = require('tang-js-api-lib').restApiLib;
let apiResponse, swaggerValidationResponse;
let definition = 'PartyDetails';
let swaggerSpecFilePath = config.swaggerFolderPath + 'sampleRestApi.json';
assertDiff.options.strict = true;

module.exports = function () {

  this.Given(/^I set the expected balance in the mock server by specifying (.*) and (.*) and (.*)$/, (header, queryParameter, mockResponseKey) => {
    return mockApplication.setMockResponse(header, queryParameter, mockResponseKey);
  });

  this.Then(/^I fetch the balance from Balance API by specifying (.*) and (.*)$/, (header, queryParameter) => {
    return aut.getAPIResponse(header, queryParameter)
      .then((response) => {
        apiLib.setApplicationLogs('BALANCE API RESPONSE DETAILS', response);
        apiLib.validateResponseWithSwaggerSpecDefinition(definition, swaggerSpecFilePath, response, function (data) {
          swaggerValidationResponse = data;
        });
        apiResponse = response;
      });
  });

  this.Given(/^I should get the response as per the API schema with status code as 200$/, function () {
    expect(apiResponse.statusCode).to.equal(200, 'Status Code returned: ' + apiResponse.statusCode);
    expect(swaggerValidationResponse.success).to.equal(true, 'Swagger validation failed for API: ' + JSON.stringify(swaggerValidationResponse.actual));
  });

  this.Then(/^the retrieved balance should match with the response from expected result file (.*)$/, (expectedResultKey) => {
    assertDiff.deepEqual(expectedResults.getResponse(expectedResultKey), apiResponse.body);
  });
};
