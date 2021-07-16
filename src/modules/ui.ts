import { createSlice } from '@reduxjs/toolkit';

export interface UiStoreState {
  loadingBar: boolean;
}

const initialState: UiStoreState = {
  loadingBar: false,
};

const uiStore = createSlice({
  name: 'uiStore',
  initialState,
  reducers: {
    displayLoadingBar: (state, { payload }) => {
      state.loadingBar = payload;
    },
  },
});

export const { displayLoadingBar } = uiStore.actions;
export default uiStore.reducer;
