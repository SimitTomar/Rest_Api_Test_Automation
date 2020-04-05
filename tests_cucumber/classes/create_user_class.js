class CreateUser {

    /* Receives the builder and assigns the values */
    constructor(builder) {
        this.employeeName = builder.employeeName;
        this.emailId = builder.emailId
        this.gender = builder.gender;
        this.title = builder.title;
        this.currentSalary = builder.currentSalary;
    }

    /* Some Business logic and abstract/generic methods here */
}


module.exports = CreateUser;