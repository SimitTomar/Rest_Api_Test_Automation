const BaseBuilder = require('../base/base_builder');
const data = require('../../data/employees.json').queryParams;

class CreateEmployeesQueryParamBuilder extends BaseBuilder {
    constructor() {
        super(data);
        return this;
    }
    
    withGender(gender) {
        this.data.gender = gender
        return this;
    }

    withTitle(title) {
        this.data.title = title
        return this;
    }

    withoutGender() {
        if (this.data.hasOwnProperty('gender')) {
            delete this.data.gender;
        }
        return this;
    }
}

module.exports = CreateEmployeesQueryParamBuilder;