import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import Api from '../api';
import history from '../utils/history';

// state interface
interface NoteState {
  noteList: null | Array<number | string>;
}

// 게시글 등록 interface
interface FormDataInfo {
  title: string;
  contents: string;
}

// 초기 state
const initialState: NoteState = {
  noteList: null,
};

// API 노트 가져오기
export const getNoteData = createAsyncThunk(
  'note/getNoteData',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await Api.get('posts');
      return data.posts;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// 게시글 등록
export const onSubmitFormHandler = createAsyncThunk(
  'note/onSubmitFormHandler',
  async (formData: FormDataInfo, { rejectWithValue }) => {
    try {
      await Api.post('posts', formData);
      alert('등록이 완료되었습니다.');
      history.push('/');
    } catch ({ response }) {
      alert(response.data.message);
    }
  }
);

// 게시글 삭제
export const onDeleteHandler = createAsyncThunk(
  'note/onDeleteHandler',
  async (_id: string, { dispatch, rejectWithValue }) => {
    try {
      await Api.delete(`posts/${_id}`);
      alert('게시글이 삭제되었습니다.');
      // createAsyncThunk 안에서의 dispatch
      dispatch(getNoteData());
    } catch ({ response }) {
      return rejectWithValue(response.data.error);
    }
  }
);

const note = createSlice({
  name: 'note',
  initialState,
  reducers: {
    // 등록 취소
    cancelHandler: () => {
      if (window.confirm('등록을 취소하시겠습니까?')) {
        history.goBack();
      }
    },
  },
  extraReducers: (builder) => {
    // 노트 가져오기 실행전
    builder.addCase(getNoteData.pending, (state, { payload }) => {});
    // 노트 가져오기 성공
    builder.addCase(getNoteData.fulfilled, (state, { payload }) => {
      state.noteList = payload;
    });
    // 노트 가져오기 실패
    builder.addCase(getNoteData.rejected, (state, { payload }) => {});
  },
});

export const { cancelHandler } = note.actions;
export default note.reducer;
