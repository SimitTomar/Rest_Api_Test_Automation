const BaseBuilder = require('../base/base_builder');
const data = require('../../data/new_salary.json').queryParams;

class CreateNewSalaryQueryParamBuilder extends BaseBuilder {
    constructor() {
        super(data);
        return this;
    }

   withEmployeeName(employeeName) {
        this.data.employeeName = employeeName
        return this;
    }
}

module.exports = CreateNewSalaryQueryParamBuilder;