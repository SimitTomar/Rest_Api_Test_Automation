const supertest = require('supertest');
const expect = require('chai').expect;
var itParam = require('mocha-param');


let baseURL = supertest("https://reqres.in");
let list_users = "/api/users";

var myData = [
    { name: 'rob', job: 'receptionist' }, 
    { name: 'sally', job: 'painter' },
    { name: 'simit', job: 'architect', domain: 'testing' }
];

describe('POST Request',()=>{
    let post_resp;
    itParam('makes a POST call with name ${value.name} and title ${value.job}', myData, async (person)=>{

        console.log('name', person.name);
        console.log('job', person.job);
        console.log('domain', person.domain);

        post_resp = await baseURL.post(list_users)
        .type('form')
        .send({
                "name": person.name,
                "job": person.job
        })
        .set('Accept','/application/\json/');

        await (console.log(post_resp.body));
    });

    it('asserts that the response code is 201',async ()=>{
        await (expect(post_resp.status).to.eql(201));
    })
});
