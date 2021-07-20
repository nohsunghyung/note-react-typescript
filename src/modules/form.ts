import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import Api from '../api';
import history from '../utils/history';

// state 초기 interface
export interface LoginState {
  token: string;
  user: null;
  errorMsg: any;
  isLoadingBar: boolean;
}

// 로그인 유저 정보
interface LoginUserInfo {
  username: string;
  password: string;
}

// 회원가입 유저 정보
interface SignupUserInfo {
  username: string;
  password: string;
  nickname: string;
}

// interface 셋팅
const initialState: LoginState = {
  token: localStorage.getItem('token') || '',
  user: null,
  errorMsg: '',
  isLoadingBar: false,
};

// 로그인 - 비동기 함수
export const submitLogin = createAsyncThunk(
  'form/submitLogin',
  async (userInfo: LoginUserInfo, { rejectWithValue }) => {
    // 성공시
    try {
      const { data } = await Api.post('login', userInfo);
      return data;
    } catch (error) {
      // 실패시
      return rejectWithValue(error.response.data);
    }
  }
);

// 회원가입 - 비동기
export const submitSignup = createAsyncThunk(
  'form/submitSignup',
  async (userInfo: SignupUserInfo, { rejectWithValue }) => {
    try {
      const response = await Api.post('signup', userInfo);
      if (response.status === 200) {
        // 회원가입 성공시 로그인화면으로
        history.push('/');
      }
      return response.data;
    } catch ({ response }) {
      return rejectWithValue(response.data);
    }
  }
);

const form = createSlice({
  name: 'form',
  initialState,
  // 리듀서 함수
  reducers: {
    logout: (state) => {
      state.token = '';
      state.user = null;
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    },
  },
  // 비동기 함수 리듀서
  extraReducers: (builder) => {
    // 로그인 실행 전
    builder.addCase(submitLogin.pending, (state, { payload }) => {});
    // 로그인 성공시
    builder.addCase(submitLogin.fulfilled, (state, { payload }) => {
      const { token, user } = payload;
      state.token = token;
      state.user = user;
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      alert(`${user.nickname}님 환영합니다.`);
    });
    // 로그인 실패시
    builder.addCase(submitLogin.rejected, (state, { payload }) => {
      state.errorMsg = payload;
    });
    // 회원가입 성공시
    builder.addCase(submitSignup.fulfilled, (state, { payload }) => {
      alert(
        `${payload.nickname} 님 회원가입을 축하드립니다.\n로그인페이지로 이동합니다.`
      );
    });
  },
});

export const { logout } = form.actions;
export default form.reducer;
