const BaseBuilder = require('../base/base_builder');
const data = require('../../data/employees.json').body;

class CreateEmployeesRequestBodyBuilder extends BaseBuilder {
    constructor() {
        super(data);
        return this;
    }

    withEmployeeName(employeeName) {
        this.data.employeeName = employeeName
        return this;
    }

    withEmailId(emailId) {
        this.data.emailId = emailId
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

    withCurrentSalary(currentSalary) {
        this.data.currentSalary = currentSalary
        return this;
    }

    withoutGender() {
        if (this.data.hasOwnProperty('gender')) {
            delete this.data.gender;
        }
        return this;
    }
}

module.exports = CreateEmployeesRequestBodyBuilder;