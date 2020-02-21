var commonUtils = require('../../../features/functionalLibs/commonUtils');

var self = {
    queryParams: {
        "QueryParameter_Default": {
            "AccountNumber": "99887766",
            "SortCode": "998866"
        },

        "TC_1_QueryParams": {
            "AccountNumber": "99887766"
        },

        "TC_2_QueryParams": {
            "AccountNumber": "99887767"
        }
    },

    getQueryParams: function (queryParamsKey) {
        return commonUtils.getOverriddenData(self.queryParams, 'QueryParameter_Default', queryParamsKey);
    }
};

exports.queryParamList = self;