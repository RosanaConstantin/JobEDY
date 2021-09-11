import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8080/api/test/';

class JobService {
  getJobBoard() {
    return axios.get(API_URL + 'jobs', { headers: authHeader() });
  }
  getJob(id) {
    return axios.get(API_URL + `jobs/${id}`, { headers: authHeader() });
  }
  saveJob(data) {
    return axios.post(API_URL + `jobs`, data, { headers: authHeader() });
  }
  updateJob(data,id) {
    return axios.put(API_URL + `jobs/update/${id}`, data, { headers: authHeader() });
  }
  deleteJob(id) {
    return axios.delete(API_URL + `jobs/delete/${id}`,{ headers: authHeader() });
  }
}

export default new JobService();
