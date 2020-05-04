import axios from 'axios';

const proxy = 'https://cors-anywhere.herokuapp.com/';
// const proxy = '';

const address =
  'http://ec2-13-211-29-46.ap-southeast-2.compute.amazonaws.com:8022/v1';

const instance = axios.create({
  timeout: 10000,
  baseURL: proxy + address,
  crossDomain: true,
  headers: {
    'Content-Type': 'application/json;charset=utf-8',
  },
});

export const login = (data) => {
  return instance.post('/markers/login', data);
};

export const signUp = (data) => {
  return instance.post('/markers/register', data);
};

export const getProjects = (id) => {
  return instance.get(`/projects/${id}`);
};
