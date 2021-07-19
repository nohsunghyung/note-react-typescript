import axios from 'axios';
import interceptors from './interceptors';

const Api = axios.create({
  baseURL: 'http://localhost:3003/'
});

// 인터셉터 작업
const instance = interceptors(Api);

export default instance;
