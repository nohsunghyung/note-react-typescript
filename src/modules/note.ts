import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import Api from '../api';

// state interface
interface NoteState {
  noteList: null | Array<number | string>;
}

// 초기 state
const initialState: NoteState = {
  noteList: null
};

// API 노트 가져오기
export const getNoteData = createAsyncThunk('note/getNoteData', async (_, { rejectWithValue }) => {
  try {
    const { data } = await Api.get('posts');
    return data.posts;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

const note = createSlice({
  name: 'note',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Api 호출전
    builder.addCase(getNoteData.pending, (state, { payload }) => {});
    // 비동기 성공시
    builder.addCase(getNoteData.fulfilled, (state, { payload }) => {
      state.noteList = payload;
    });
    // 비동기 실패시
    builder.addCase(getNoteData.rejected, (state, { payload }) => {});
  }
});

// export const {} = note.actions;
export default note.reducer;
