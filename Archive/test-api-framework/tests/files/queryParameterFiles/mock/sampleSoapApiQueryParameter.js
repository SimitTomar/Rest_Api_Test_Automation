var commonUtils = require('../../../features/functionalLibs/commonUtils');

var self = {
    queryParams: {
        "QueryParameter_Default": {
           
        },

        "TC_1_QueryParams": {
            "sCountryISOCode": "NL"
        },

        "TC_2_QueryParams": {
            "sCountryISOCode": "IN"
        }

    },

    getQueryParams: function (queryParamsKey) {
        return commonUtils.getOverriddenData(self.queryParams, 'QueryParameter_Default', queryParamsKey);
    }
};

exports.queryParamList = self;