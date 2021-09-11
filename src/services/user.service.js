import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8080/api/test/';

class UserService {
  getUserBoard() {
    return axios.get(API_URL + 'user', { headers: authHeader() });
  }
  getUser(id) {
    return axios.get(API_URL + `users/${id}`, { headers: authHeader() });
  }
  getPublicContent() {
    return axios.get(API_URL + 'all');
  }
  getAdminBoard() {
    return axios.get(API_URL + 'admin', { headers: authHeader() });
  }
}

export default new UserService();
