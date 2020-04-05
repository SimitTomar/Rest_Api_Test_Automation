const CreateUser = require('../classes/create_user_class');

class CreateUserBuilder {
    constructor() {}

    /* Generate Default Fields for a User */
    populateDefaultFields() {
        this.employeeName = "NoName";
        this.emailId = "noName@sapient.com"
        this.gender = "Male";
        this.title = "Associate";
        this.currentSalary = 30000;
        return this;
    }

    withEmployeeName(employeeName) {
        this.employeeName = employeeName
        return this;
    }

    withemailId(emailId) {
        this.emailId = emailId
        return this;
    }

    withgender(gender) {
        this.gender = gender
        return this;
    }

    withtitle(title) {
        this.title = title
        return this;
    }

    withcurrentSalary(currentSalary) {
        this.currentSalary = currentSalary
        return this;
    }

    build() {

        return new CreateUser(this);
    }
}

module.exports = CreateUserBuilder;