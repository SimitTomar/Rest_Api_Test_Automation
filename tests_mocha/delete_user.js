const supertest = require('supertest');
const expect = require('chai').expect;


let baseURL = supertest("https://reqres.in");
let list_users = "/api/users/2";

describe('DELETE Request', () => {
    let del_resp;
    it('makes a delete call ', async () => {
        del_resp = await baseURL.delete(list_users);

        // await (console.log(del_resp.body));
    });

    it('asserts that the response code is 204',async()=>{
        await (expect(del_resp.status).to.eql(204));
    });
});