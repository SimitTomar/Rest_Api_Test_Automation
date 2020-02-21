const soapApiLib = require('tang-js-api-lib').soapApiLib;
const apiLib = require('tang-js-api-lib').restApiLib;
const config = require('../../conf/local.conf.js').config;
let uri = require('../../conf/local.conf.js').config.apiEndpointPath;
let headers = require(`../../files/headerFiles/${config.app}/sampleSoapApiHeader`).headerList;
let queryParams = require(`../../files/queryParameterFiles/${config.app}/sampleSoapApiQueryParameter`).queryParamList;

module.exports = {
  getAPIResponse: (header, queryParameter, method) => {

    let headerData = headers.getHeaders(header);
    let propertiesObject = queryParams.getQueryParams(queryParameter);

    const options = {
      method: method,
      uri: uri['sampleSoapApi'].url,
      wsdl: uri['sampleSoapApi'].wsdl,
      qs: propertiesObject,
      headers: headerData
    };

    apiLib.setApplicationLogs('API REQUEST DETAILS', options);
    return soapApiLib.getSoapResponse(options);
  }
};
