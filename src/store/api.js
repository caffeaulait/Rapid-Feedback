import axios from 'axios';

// const proxy = 'https://cors-anywhere.herokuapp.com/';
const proxy = '';

const address =
  'http://ec2-13-211-29-46.ap-southeast-2.compute.amazonaws.com:8022/v1';

export default address;

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

export const createProject = (data) => {
  return instance.post(`/projects/`, data);
};

export const updateProject = (data) => {
  return instance.put(`/projects/${data.id}`, data);
};

export const deleteProject = (id) => {
  return instance.delete(`/projects/${id}`);
};

export const getAllMarkers = () => {
  return instance.get(`/markers/all`);
};

export const getMarkers = (id) => {
  return instance.get(`/projects/${id}/getMarker`);
};

export const updateMarkers = (data) => {
  console.log(instance);
  return instance.post(`/projects/addMarker`, data);
};

export const getCriterias = (id) => {
  // localhost:8099/v1/projects/7/getCriteria
  return instance.get(`/projects/${id}/getCriteria`);
};

export const setCriteria = (pid, data) => {
  return instance.put(`/projects/${pid}/setCriteria`, data);
};

export const addCriteria = (data) => {
  return instance.post(`/projects/addCriteria`, data);
};

export const deletCriteria = (pid, cid) => {
  return instance.delete(`/projects/${pid}/${cid}`);
};

export const getStudents = (pid) => {
  // /v1/students/{projectId}
  return instance.get(`/students/${pid}`);
};

export const createStudent = (data) => {
  // /v1/students
  return instance.post(`/students`, data);
};

export const addStudentGroup = (data) => {
  return instance.post(`/groups`, data);
};

export const updateStudent = (data) => {
  return instance.put();
};

export const deleteStudent = (pid, sid) => {
  // /v1/students/{studentId}/{projectId}
  return instance.delete(`/students/${sid}/${pid}`);
};

export const createGroup = (data) => {
  // /v1/groups
  return instance.post(`/groups`, data);
};

export const deleteGroup = (pid, gid) => {
  // /v1/groups/{projectId}/{groupId}
  return instance.delete(`/groups/${pid}/${gid}`);
};

export const importStudents = (data) => {
  return instance.post('/students/batch', data);
};

export const getResults = (pid, targetId, markerId) => {
  return instance.get();
};

export const getAllResults = (pid, targetId) => {
  return instance.get(`result/${pid}/${targetId}`);
};

export const uploadResults = (data) => {
  return instance.post('/assess', data);
};

export const upDateResult = (data) => {
  return instance.put("/updateAssess",data)
}

export const getComments = (mid) => {
  return instance.get(`/comments/${mid}`);
};

export const addComment = (data) => {
  return instance.post('/addComment', data);
};

export const sendReport = (data) => {
  return instance.post('/result/email', data);
};

export const uploadAudio = (data, boundary) => {
  let config = {
    crossDomain: true,
    withCredentials: true,
    headers: {
      token: localStorage.getItem('token'),
    },
  };
  return axios.post(`${address}/v1/result/audio`, data, config);
};
