import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8080/api/test/';

class ApplicationService {

  getApplicationBoard() {
    return axios.get(API_URL + 'applications', { headers: authHeader() });
  }
  getApplication(id) {
    return axios.get(API_URL + `applications/${id}`, { headers: authHeader() });
  }
  deleteApplication(id) {
    return axios.delete(API_URL + `applications/${id}`, { headers: authHeader() });
  }
  getApplicationByUser(username) {
    return axios.get(API_URL + `applications?username=${username}`, { headers: authHeader() });
  }
  deleteApplicationsByJob(id) {
    return axios.get(API_URL + `applications?jobId=${id}`, { headers: authHeader() });
  }
  saveApplication(data) {
    return axios.post(API_URL + `applications`, data, { headers: authHeader() });
  }
  updateApplication(data,id) {
    return axios.put(API_URL + `applications/${id}`, data, { headers: authHeader() });
  }
}

export default new ApplicationService();
