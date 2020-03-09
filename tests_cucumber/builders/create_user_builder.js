const CreateUser = require('../classes/create_user_class');

class CreateUserBuilder {
    constructor() {}

    /* Generate Default Fields for a User */
    populateDefaultFields() {
        this.name = "NoName";
        this.emailId = "noName@sapient.com"
        this.gender = "Male";
        this.title = "Associate";
        this.currentSalary = 30000;
        this.experience = 10;
        return this;
    }

    withname(name) {
        this.name = name
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

    withexperience(experience) {
        this.experience = experience
        return this;
    }

    build() {

        return new CreateUser(this);
    }
}

module.exports = CreateUserBuilder;