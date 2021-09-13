import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8080/api/test/';

class ProfileService {
  getProfile(id) {
    return axios.get(API_URL + `profile/${id}`, { headers: authHeader() });
  }
  saveProfile(data) {
    return axios.post(API_URL + `profile`, data, { headers: authHeader() });
  }
  updateProfile(data,id) {
    return axios.put(API_URL + `profile/${id}`, data, { headers: authHeader() });
  }
}

export default new ProfileService();
