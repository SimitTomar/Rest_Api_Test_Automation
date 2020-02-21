const request = require('request-promise');
const config = require('../../conf/local.conf.js').config;
const apiLib = require('tang-js-api-lib').apiLib;
let uri = require('../../conf/local.conf.js').config.apiEndpointPath;
let headers = require(`../../files/headerFiles/${config.app}/sampleRestApiHeader`).headerList;
let queryParams = require(`../../files/queryParameterFiles/${config.app}/sampleRestApiQueryParameter`).queryParamList;

module.exports = {
  getAPIResponse: (header, queryParameter) => {

    let headerData = headers.getHeaders(header);
    let propertiesObject = queryParams.getQueryParams(queryParameter);
    let url = uri['sampleRestApi'];

    const options = {
      method: 'GET',
      uri: url,
      qs: propertiesObject,
      headers: headerData,
      rejectUnauthorized: false,
      followRedirect: false,
      resolveWithFullResponse: true,
      json: true
    };
    
    // The following line logs API Request details which is implicitly included in the respose log. Un-comment to enable it, if required to be logged explicitly
    // apiLib.setApplicationLogs('BALANCE API REQUEST DETAILS', options);
    return request(options);
  }
};
