const { setDefaultTimeout } = require("cucumber");

setDefaultTimeout(30 * 1000);


class Config {
  constructor() {
    this._scenarioContext = null;
    this._createUserBody = null;
  }

  set scenarioContext(newValue) {
    this._scenarioContext = newValue;
  }

  get scenarioContext() {
    return this._scenarioContext;
  }

  set createUserBody(newCreateUserBody){
    this._createUserBody = newCreateUserBody;
  }

  get createUserBody(){
    return this._createUserBody;
  }



}

module.exports = Config;