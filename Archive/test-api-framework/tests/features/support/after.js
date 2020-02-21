const apiLib = require('tang-js-api-lib').restApiLib;

var appendLogs = function () {

   this.After(function (scenario, callback) {
       if (scenario.isFailed()) {
           let applicationLogs = apiLib.getApplicationLogs();
           scenario.attach(JSON.stringify(applicationLogs, null, 2), 'application/json', callback);
       }
       else {
           callback();
       }
   });
};

module.exports = appendLogs;
