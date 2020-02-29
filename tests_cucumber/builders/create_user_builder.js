const CreateUser = require('../classes/create_user_class');

class CreateUserBuilder {
    constructor() {}

    /* Generate Default Fields for a User */
    populateDefaultFields() {
        this.lastName = 'Tomar'
        this.job = 'Sr. Manager'
        return this;
    }

    withFirstName(firstName) {
        this.firstName = firstName
        return this;
    }

    withLastName(lastName) {
        this.lastName = lastName
        return this;
    }

    withJob(job) {
        this.job = job
        return this;
    }

    build() {

        // Throw Error in case Mandatory Fields are missing
        if (!('firstName' in this)) {
            throw new Error('firstName is missing');
        }

        return new CreateUser(this);
    }
}

module.exports = CreateUserBuilder;