import { createSlice } from '@reduxjs/toolkit';

// state 초기 interface
export interface UiStoreState {
  loadingBar: boolean;
}

// 초기 state
const initialState: UiStoreState = {
  loadingBar: false,
};

const uiStore = createSlice({
  name: 'uiStore',
  initialState,
  reducers: {
    // 로딩바 리듀서
    displayLoadingBar: (state, { payload }) => {
      state.loadingBar = payload;
    },
  },
});

export const { displayLoadingBar } = uiStore.actions;
export default uiStore.reducer;
