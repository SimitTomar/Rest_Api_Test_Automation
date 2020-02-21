const config = require('../../conf/local.conf.js').config;
const mockServer = require('mockserver-client').mockServerClient("localhost", 10080);
let headers = require(`../../files/headerFiles/${config.app}/sampleRestApiHeader`).headerList;
let queryParams = require(`../../files/queryParameterFiles/${config.app}/sampleRestApiQueryParameter`).queryParamList;
let mockDataSet = require('../../files/mockSourceData/sampleApiMock').mockData;

module.exports = {
  setMockResponse: (header, queryParameter,mockResponseKey) => {

    let headerData = headers.getHeaders(header);
    let propertiesObject = queryParams.getQueryParams(queryParameter);
    let mockData = mockDataSet.getMockData(mockResponseKey);

    return mockServer.mockAnyResponse({
      'httpRequest': {
        'method': 'GET',
        'path': '/findCustomerDetails',
        'queryStringParameters': [
          {
            'name': 'AccountNumber',
            'values': propertiesObject.AccountNumber
          },
          {
            'name': 'SortCode',
            'values': propertiesObject.SortCode
          }
        ],

        'headers': [
          {
            "name": "ProductType",
            "values": [headerData.ProductType]
          }
        ]
      },
      'httpResponse': {
        'statusCode': 200,
        'body': JSON.stringify(mockData)
      },
      'times': {
        'unlimited': true
      }
    });
  }
};
