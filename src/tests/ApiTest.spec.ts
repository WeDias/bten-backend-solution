import { User } from '@models/User';
import axios, { AxiosResponse } from 'axios';
import { config } from 'dotenv-safe';
import Auth from '@middlewares/Auth';

config();

const BASE_URL: string = `http://localhost:${process.env.PORT}`;

const newUserForm = {
  name: 'Wesley Dias',
  homeTeam: 'Dev',
  age: 20,
  height: 1.76,
  username: 'Wes',
  password: 'teste123',
};

const updateUserForm = {
  name: 'Wesley',
  homeTeam: 'Ved',
  age: 21,
};

let testUser : User = null;

describe('Test user API', () => {
  describe('Method POST', () => {
    test(`It should response the POST method on "${BASE_URL}/api/user" with a new valid user`, async () => {
      const response: AxiosResponse = await axios.post(`${BASE_URL}/api/user`, newUserForm);
      testUser = response.data;
      expect(response.status).toEqual(200);
    });

    test(`It should response the POST method on "${BASE_URL}/api/user" with invalid username`, async () => {
      const response: AxiosResponse = await axios.post(`${BASE_URL}/api/user`, newUserForm).catch((e) => e.response);
      expect(response.status).toEqual(500);
    });
  });

  describe('Method GET', () => {
    test(`It should response the GET method on "${BASE_URL}/api/user"`, async () => {
      const response: AxiosResponse = await axios.get(`${BASE_URL}/api/user`);
      expect(response.status).toEqual(200);
    });

    test(`It should response the GET method on "${BASE_URL}/api/user/:id" with valid user id`, async () => {
      const response: AxiosResponse = await axios.get(`${BASE_URL}/api/user/${testUser.id}`);
      expect(response.status).toEqual(200);
    });

    test(`It should response the GET method on "${BASE_URL}/api/user/:id" with invalid user id`, async () => {
      const response: AxiosResponse = await axios.get(`${BASE_URL}/api/user/-1`).catch((e) => e.response);
      expect(response.status).toEqual(404);
    });
  });

  describe('Method PUT', () => {
    test(`It should response the PUT method on "${BASE_URL}/api/user/:id" with valid user id`, async () => {
      const response: AxiosResponse = await axios.put(`${BASE_URL}/api/user/${testUser.id}`, updateUserForm);
      testUser = response.data;
      expect(response.status).toEqual(200);
    });

    test(`It should response the PUT method on "${BASE_URL}/api/user/:id" with invalid user id`, async () => {
      const response: AxiosResponse = await axios.put(`${BASE_URL}/api/user/-1`, updateUserForm).catch((e) => e.response);
      expect(response.status).toEqual(404);
    });
  });

  describe('Method DELETE', () => {
    test(`It should response the DELETE method on "${BASE_URL}/api/user/:id" with valid user id`, async () => {
      const response: AxiosResponse = await axios.delete(`${BASE_URL}/api/user/${testUser.id}`);
      expect(response.status).toEqual(200);
    });

    test(`It should response the DELETE method on "${BASE_URL}/api/user/:id" with invalid user id`, async () => {
      const response: AxiosResponse = await axios.delete(`${BASE_URL}/api/user/${testUser.id}`).catch((e) => e.response);
      expect(response.status).toEqual(404);
    });
  });
});

describe('Test auth API', () => {
  describe('Test Login/Logout', () => {
    test(`It should response the POST method on "${BASE_URL}/api/auth/login/ with valid login`, async () => {
      const responseTestUser: AxiosResponse = await axios.post(`${BASE_URL}/api/user`, newUserForm);
      testUser = responseTestUser.data;

      const { username = null, password = null } = newUserForm;
      const response: AxiosResponse = await axios.post(`${BASE_URL}/api/auth/login`, { username, password });
      expect(response.status).toEqual(200);
      expect(response.headers['set-cookie'][0].startsWith(Auth.cookieName));
    });

    test(`It should response the GET method on "${BASE_URL}/api/auth/logout/ with user not logged`, async () => {
      await axios.delete(`${BASE_URL}/api/user/${testUser.id}`);
      const response: AxiosResponse = await axios.get(`${BASE_URL}/api/auth/logout`).catch((e) => e.response);
      expect(response.status).toEqual(403);
    });
  });
});