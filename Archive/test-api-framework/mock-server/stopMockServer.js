var mockserver = require('mockserver-grunt');

mockserver.stop_mockserver({
    serverPort: 10080,
    verbose: true
});
