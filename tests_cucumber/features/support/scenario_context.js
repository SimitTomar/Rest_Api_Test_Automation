class ScenarioContext {
    constructor() {
      this._value = null;
    }
  
    get value() {
      return this._value;
    }
  
    set value(newvalue) {
      this._value = newvalue;
    }
  
}

module.exports = ScenarioContext;