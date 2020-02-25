const supertest = require('supertest');
const expect = require('chai').expect;


let baseURL = supertest("https://reqres.in");
let list_users = "/api/users";

console.log('simProcess: ', process.env.name);

describe('POST Request',()=>{
    let post_resp;
    it('makes a POST call ',async ()=>{
        post_resp = await baseURL.post(list_users)
        .type('form')
        .send({
                "name": "morpheus",
                "job": "leader"
        })
        .set('Accept','/application/\json/');

        await (console.log(post_resp.body));
    });

    it('asserts that the response code is 201',async ()=>{
        await (expect(post_resp.status).to.eql(201));
    })
});
