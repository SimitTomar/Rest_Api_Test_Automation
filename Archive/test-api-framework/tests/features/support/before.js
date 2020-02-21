/* jslint node: true */
'use strict';

const apiLib = require('tang-js-api-lib').restApiLib;

module.exports = function() {
    // cleanup before every scenario
    this.Before(function(scenario, callback) {
        apiLib.cleanApplicationLogs();
        callback();
    });
};
