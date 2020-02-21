var commonUtils = require('../../../features/functionalLibs/commonUtils');

var self = {
    headers: {
        "Header_Default": {
            "ProductType": "BCA"
        },

        "TC_1_Header": {
            "ProductType": "BCA"
        }
    },

    getHeaders: function (expectedHeaderKey) {
        return commonUtils.getOverriddenData(self.headers, 'Header_Default', expectedHeaderKey);
    }
};

exports.headerList = self;