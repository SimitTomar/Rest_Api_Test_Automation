class CreateUser {

    /* Receives the builder and assigns the values */
    constructor(builder) {
        this.firstName = builder.firstName;
        this.lastName = builder.lastName
        this.job = builder.job;
    }

    /* Some Business logic and abstract/generic methods here */
}


module.exports = CreateUser;