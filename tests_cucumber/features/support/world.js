const { setWorldConstructor } = require("cucumber");

class CustomWorld {
  constructor() {
    this._value = null;
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