const supertest = require('supertest');
// const expect = require('chai').expect;
// const schema = require('../validation/list_users_schema');
// const joi = require('joi');
const { Given, When, Then } = require('cucumber');

let baseURL = supertest("https://reqres.in");
let list_users = "/api/users?page=2";


Given(/^I have the access to registered users$/, async () => {

    let res;
    res = await baseURL.get(list_users); //Sending the GET request
    console.log(res.body);

});

When(/^I fetch the User list$/, () => {

});


Then(/^I should get all the registered users$/, () => {

});