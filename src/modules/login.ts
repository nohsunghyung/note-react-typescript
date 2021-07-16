import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import Api from '../api';

// initialstate 초기 interface
export interface LoginState {
  token: string;
  user: object;
  errorMsg: any;
  isLoadingBar: boolean;
}

// 로그인 유저 정보
interface UserInfo {
  username: string;
  password: string;
}

// interface 셋팅
const initialState: LoginState = {
  token: '',
  user: {},
  errorMsg: '',
  isLoadingBar: false,
};

// 로그인 - 비동기 함수
export const submitLogin = createAsyncThunk(
  'login/submitLogin',
  async (userInfo: UserInfo, { rejectWithValue }) => {
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

const login = createSlice({
  name: 'login',
  initialState,
  // 리듀서 함수
  reducers: {},
  // 비동기 함수 리듀서
  extraReducers: (builder) => {
    // 비동기 실행 전
    builder.addCase(submitLogin.pending, (state, { payload }) => {
      state.isLoadingBar = true;
    });
    // 비동기 성공시
    builder.addCase(submitLogin.fulfilled, (state, { payload }) => {
      state.isLoadingBar = false;
      state.token = payload.token;
      state.user = payload.user;
    });
    // 비동기 실패시
    builder.addCase(submitLogin.rejected, (state, { payload }) => {
      state.isLoadingBar = false;
      state.errorMsg = payload;
    });
  },
});

// export const {} = login.actions;
export default login.reducer;
