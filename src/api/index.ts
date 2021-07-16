import axios from 'axios';
import { displayLoadingBar } from '../modules/ui';
import store from '../index';

const Api = axios.create({
  baseURL: 'http://localhost:3003/',
});

Api.interceptors.request.use(
  function (config) {
    // 요청을 보내기 전에 수행할 일
    const { dispatch } = store;
    dispatch(displayLoadingBar(true));
    // debugger;
    return config;
  },
  function (error) {
    // 오류 요청을 보내기전 수행할 일
    // ...
    return Promise.reject(error);
  }
);

// 응답 인터셉터 추가
Api.interceptors.response.use(
  function (response) {
    // 응답 데이터를 가공
    const { dispatch } = store;
    dispatch(displayLoadingBar(false));
    return response;
  },
  function (error) {
    // 오류 응답을 처리
    const { dispatch } = store;
    dispatch(displayLoadingBar(false));
    return Promise.reject(error);
  }
);

export default Api;
