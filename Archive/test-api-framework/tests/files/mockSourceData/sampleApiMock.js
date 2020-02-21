var commonUtils = require('../../features/functionalLibs/commonUtils');

var self = {
    mocks: {
        "Mock_Default": {
            "First Name": "James",
            "Last Name": "Brown"
        },

        "TC_1_Mock": {
            "Balance": 1750.4,
            "Overdraft": 100
        },

        "TC_2_Mock": {
            "First Name": "Philip",
            "Balance": 245.98,
            "Overdraft": 0
        }

    },

    getMockData: function (expectedMockKey) {
        return commonUtils.getOverriddenData(self.mocks, 'Mock_Default', expectedMockKey);
    }
};

exports.mockData = self;