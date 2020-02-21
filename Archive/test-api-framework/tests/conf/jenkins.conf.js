//This Config File should contain the attributes which are to be used for Execution of Automation Scripts against Jenkins
//Say, in the below case the Endpoints pertaining to Jenkins would be picked up
let apiEndpoint = require('../endpoints/apiEndpoints.js');

let jenkinsConfig = module.exports = {
    apiEndpointPath: apiEndpoint.getEndpoint('jenkins')
};

