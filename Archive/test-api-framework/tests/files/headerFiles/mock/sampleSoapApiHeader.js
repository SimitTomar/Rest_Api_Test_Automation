var commonUtils = require('../../../features/functionalLibs/commonUtils');

var self = {
    headers: {
        "Header_Default": {
           
        },

        "TC_1_Header": {
            
        }
    },

    getHeaders: function (expectedHeaderKey) {
        return commonUtils.getOverriddenData(self.headers, 'Header_Default', expectedHeaderKey);
    }
};

exports.headerList = self;