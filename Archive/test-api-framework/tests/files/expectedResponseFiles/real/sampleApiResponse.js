var commonUtils = require('../../../features/functionalLibs/commonUtils');

var self = {
    responses: {
        "Response_Default": {
            "Party Details": {
                "Account Number": 99887766,
                "Sort Code": 998866,
                "Name": "James Brown",
                "Available Balance": "1850.40" }
        },

        "TC_1_Response": {
            "Party Details": {
                "Account Number": 99887766,
                "Available Balance": "1850.40" }
        },

        "TC_2_Response": {
            "Party Details": {
                "Account Number": 99887767,
                "Name": "Philip Brown",
                "Available Balance": "245.98" }
        }

    },
    
    getResponse: function (expectedResultKey) {
        return commonUtils.getOverriddenData(self.responses, 'Response_Default', expectedResultKey);
    }
};

exports.expectedResponses = self;
