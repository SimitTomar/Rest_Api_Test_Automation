class BaseBuilder {
    constructor (data) {
      this.data = data;
      return this;
    }
  
    build () {
      return this.data;
    }
  }
  
  module.exports = BaseBuilder;