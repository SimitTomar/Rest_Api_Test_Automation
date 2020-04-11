const { setDefaultTimeout, setWorldConstructor } = require("cucumber");

setDefaultTimeout(30 * 1000);

class CustomWorld {
  constructor() {
    this._value = null;
    this._createUserBody = null;
  }

  set scenarioContext(newValue) {
    this._value = newValue;
  }

  get scenarioContext() {
    return this._value;
  }


  set createUserBody(newCreateUserBody){
    this._createUserBody = newCreateUserBody;
  }

  get createUserBody(){
    return this._createUserBody;
  }
}

setWorldConstructor(CustomWorld);