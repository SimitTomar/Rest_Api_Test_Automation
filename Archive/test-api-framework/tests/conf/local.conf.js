const argv = require("yargs").argv,
  override = require('json-override'),
  path = require('path'),
  exclusionTags = ['~@descoped', '~@manual', '~@wip', '~@mocks'];

//************API Declaration Starts************************
const apiEndpoint = require('../endpoints/apiEndpoints.js');
//************API Declaration Ends**************************

process.env.app = (argv.app) ? argv.app : process.env.app;
let app = process.env.app == 'undefined' ? 'mock' : process.env.app;

process.env.instance = (argv.instance) ? argv.instance : process.env.instance;
let instanceConfig = process.env.instance == 'undefined' ? {} : require(`./${process.env.instance}.conf`);

process.env.ff = (argv.ff) ? argv.ff : process.env.ff;
let featureFilePath = process.env.ff == 'undefined' ? `tests/features/featureFiles/**/*.feature` : `tests/features/featureFiles/**/${argv.ff}.feature`;


let localConfig = {



  //************API Config Starts**************************

  app: app,
  apiEndpointPath: apiEndpoint.getEndpoint('local'),
  expectedResponseFolderPath: path.join(__dirname, '../files/expectedResponseFiles/' + app),
  mockDataFolderPath: path.join(__dirname, '../files/mockSourceData'),
  jsonRequestFolderPath: path.join(__dirname, '../files/requestJsonFiles/' + app),
  swaggerFolderPath: path.join(__dirname, '../files/swaggerFiles/'),
  headerFolderPath: 'tests/files/headerFiles/' + app,
  queryParameterFolderPath: 'tests/files/queryParameterFiles/' + app,
  mockPort: 10080,

  //************API Config Ends***************************





  defaultTags: exclusionTags,
  specs: [featureFilePath],
  sync: true,
  framework: 'cucumber',
  reporters: ['spec'],
  reporterOptions: {
    outputDir: 'tests/reports/output/json'
  },

  TIMEOUTS: {
    minWait: 5000,
    maxWait: 10000
  },

// If you are using Cucumber you need to specify where your step definitions are located.
  cucumberOpts: {
    timeout: 60000,
    require: ['tests/features/step_definitions/', 'tests/features/support/', 'tests/reports/output/'],
    ignoreUndefinedDefinitions: false,
    format: 'json'
  },
  logLevel: 'silent',
  coloredLogs: true
};

exports.config = override(localConfig, instanceConfig, true);
