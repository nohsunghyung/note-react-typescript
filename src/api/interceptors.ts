import { displayLoadingBar } from '../modules/ui';
import { store } from '../index';

// api 요청 전,후 인터셉터작업
const interceptors = (instance: any) => {
  instance.interceptors.request.use(
    function (config: any) {
      // 요청을 보내기 전에 수행할 일
      const { dispatch, getState } = store;
      const { form } = getState();
      const { token } = form;
      config.headers.Authorization = token;
      // 로딩바 공통 작업
      dispatch(displayLoadingBar(true));
      return config;
    },
    function (error: object) {
      // 오류 요청을 보내기전 수행할 일
      // ...
      return Promise.reject(error);
    }
  );

  // 응답 인터셉터 추가
  instance.interceptors.response.use(
    function (response: object) {
      // 응답 데이터를 가공
      const { dispatch } = store;
      dispatch(displayLoadingBar(false));
      return response;
    },
    function (error: object) {
      // 오류 응답을 처리
      const { dispatch } = store;
      dispatch(displayLoadingBar(false));
      return Promise.reject(error);
    }
  );

  return instance;
};

export default interceptors;
