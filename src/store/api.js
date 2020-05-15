import axios from 'axios';

// const proxy = 'https://cors-anywhere.herokuapp.com/';
const proxy = '';

const address =
  'http://ec2-13-211-29-46.ap-southeast-2.compute.amazonaws.com:8022/v1';

const instance = axios.create({
  timeout: 10000,
  baseURL: proxy + address,
  crossDomain: true,
  headers: {
    'Content-Type': 'application/json;charset=utf-8',
  },
  withCredentials: true,
});

//add token to the request headers
instance.interceptors.request.use(function (config) {
  const token = localStorage.getItem('token');
  config.headers.Authorization = token ? `${token}` : '';
  return config;
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

export const createProject = (data, id) => {
  return instance.post(`/projects/${id}`, data);
};

export const updateProject = (data) => {
  return instance.put(`/projects/${data.id}`, data);
};

export const deleteProject = (id) => {
  return instance.delete(`/projects/${id}`);
};

export const getMarkers = (id) => {
  return instance.get();
};

export const updateMarkers = (data) => {
  return instance.put();
};

export const getCriterias = (id) => {
  return instance.get();
};

export const updateCriterias = (data) => {
  return instance.put(`/projects/${data.id}/setCriteria`, data);
};
