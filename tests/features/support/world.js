const { setDefaultTimeout, setWorldConstructor } = require("cucumber");

setDefaultTimeout(30 * 1000);

// class CustomWorld {
//     constructor(attach, parameters) {
//         this._response = null;
//         this._createEmployeesBody = null;
//         this.attach = attach
//         this.parameters = parameters
//     }

//     set scenarioContext(newResponse) {
//         this._response = newResponse;
//     }

//     get scenarioContext() {
//         return this._response;
//     }


//     set createEmployeesBody(newCreateEmployeesBody) {
//         this._createEmployeesBody = newCreateEmployeesBody;
//     }

//     get createEmployeesBody() {
//         return this._createEmployeesBody;
//     }
// }

// setWorldConstructor(CustomWorld);

// module.exports = CustomWorld;


// function CustomWorld({attach, parameters}) {
//     this.attach = attach
//     this.parameters = parameters
//     this.createEmployeesBody = null;
//     this.response = null;

// }

// setWorldConstructor(CustomWorld);

// module.exports = { CustomWorld }
