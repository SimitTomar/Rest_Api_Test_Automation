var commonUtils = require('../../../features/functionalLibs/commonUtils');

var self = {
    responses: {
        "Response_Default": {
            
        },

        "TC_1_Response": {
            "CountryCurrencyResult":
            {
                "sISOCode": "EUR",
                "sName": "Eur"
            }
        },

        "TC_2_Response": 
        {
            "CountryNameResult": "India"
        }

    },

    getResponse: function (expectedResultKey) {
        return commonUtils.getOverriddenData(self.responses, 'Response_Default', expectedResultKey);
    }
};

exports.expectedResponses = self;
