// @ts-check
import { test, expect } from '@playwright/test';
import { generate_member } from './helpers.js';
import  * as schemas from './schemas.js';

const nock = require('nock');

const Ajv = require("ajv")
const ajv = new Ajv()

// Request context is reused by all tests in the file.
let apiContext;

test.beforeAll(async ({ playwright }) => {
  apiContext = await playwright.request.newContext({
    baseURL: 'http://127.0.0.1:3000',
    extraHTTPHeaders: {
      'Accept': 'application/json',
    },
  });
});

test.afterAll(async ({ }) => {
  await apiContext.dispose();
});

test('test post members', async () => {
  // creating payload
  let new_member_data = []
  for(let i=0; i<3; i++){
    new_member_data.push(generate_member());
  }
  // creating members
  const post_response = await apiContext.post(`/members`, {
    data: new_member_data
  });
  const new_members = await post_response.json()
  
  // validating response against schema
  let new_ids = [];
  for (const [key, val] of Object.entries(new_members)) {
  new_ids.push(key);
  }
  let isDataValid = await ajv.validate(schemas.member_schema, new_members[new_ids[0]]);
  expect(isDataValid).toBeTruthy()

  // validating that data indeed posted to db by using a get request for one member
  const get_response = await apiContext.get(`/member?id=${new_ids[0]}`);
  const member = await get_response.json();

  isDataValid = await ajv.validate(schemas.member_schema, member);
  expect(isDataValid).toBeTruthy();
});

test('test post member', async () => {

  let new_member_data = generate_member();
  const post_response = await apiContext.post(`/member`, {
    data: new_member_data
  });
  const new_member = await post_response.json()

  const isDataValid = await ajv.validate(schemas.member_schema, new_member);
  expect(isDataValid).toBeTruthy()
});

test('test get members', async () => {

  const response = await apiContext.get(`/members`);
  const members = await response.json()

  let new_ids = [];
  for (const [key, val] of Object.entries(members)) {
  new_ids.push(key);
  }
  const isDataValid = await ajv.validate(schemas.member_schema, members[new_ids[0]]);
  expect(isDataValid).toBeTruthy()
});

test('test get member', async () => {
  // posting a member
  let new_member_data = generate_member();
  const post_response = await apiContext.post(`/member`, {
    data: new_member_data
  });
  const new_member = await post_response.json();
  const member_id = new_member['id'];

  const get_response = await apiContext.get(`/member?id=${member_id}`);
  const member = await get_response.json();

  const isDataValid = await ajv.validate(schemas.member_schema, member);
  expect(isDataValid).toBeTruthy();
});

test('test update members', async () => {
  let new_member_data = []
  for(let i=0; i<2; i++){
    new_member_data.push(generate_member());
  }
  const post_response = await apiContext.post(`/members`, {
    data: new_member_data
  });
  let new_members = await post_response.json();
  
  let new_ids = [];
  for (const [key, val] of Object.entries(new_members)) {
  new_ids.push(key);
  };
  let updated_new_members = []
  for (let id of new_ids) {
    new_members[id]['name'] += "_UPDATED";
    updated_new_members.push(new_members[id]);
  };

  const put_response = await apiContext.put(`/members`, {
    data: updated_new_members
  });
  let updated_members = await put_response.json();
    
  const isDataValid = await ajv.validate(schemas.member_schema, updated_members[new_ids[0]]);
  expect(updated_members[new_ids[0]]["name"].endsWith('_UPDATED')).toBeTruthy();
  expect(isDataValid).toBeTruthy();
});

test('test update member', async () => {
  let new_member_data = generate_member();
  const post_response = await apiContext.post(`/member`, {
    data: new_member_data
  });
  let new_member = await post_response.json();
  new_member["name"] += "_UPDATED";
  const member_id = new_member['id'];

  const put_response = await apiContext.put(`/member?id=${member_id}`, {
    data: new_member
  });
  let updated_member = await put_response.json();
    
  const isDataValid = await ajv.validate(schemas.member_schema, updated_member);
  expect(updated_member["name"].endsWith('_UPDATED')).toBeTruthy();
  expect(isDataValid).toBeTruthy();
});


test('test get members mocked', async () => {
  //creating mocked response json
  const chars = "1234567890QWERTYUIOPASDFGHJKLZXCVBNMqwertyuiopasdfghjklzxcvbnm";
  const result = Array.from({ length: 12 }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
  let member = generate_member();
  let member2 = generate_member();
  member['id'] = "MOCKED_ID_" + result;
  member2['id'] = "MOCKED_ID_2_" + result;
  const mocked_response_json = { [member['id']]: member,
                 [member2['id']]: member2 };

  //setting up intercept at Node.js level
  nock('http://127.0.0.1:5000')
      .get('/members') 
      .reply(200, 
          mocked_response_json               
        );

  const response = await apiContext.get(`/members`);
  const members = await response.json()

  let new_ids = [];
  for (const [key, val] of Object.entries(members)) {
  new_ids.push(key);
  }
  const isDataValid = await ajv.validate(schemas.member_schema, members[new_ids[0]]);
  expect(isDataValid).toBeTruthy()
});

