import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import Api from '../api';
import history from '../utils/history';

// state interface
interface NoteState {
  noteList: null | Array<number | string>;
  noteItemInfo: {
    title: string;
    contents: string;
  };
  isMenuOpen: boolean;
  showAddMenuList: string;
}

// 게시글 등록 interface
interface FormDataInfo {
  title: string;
  contents: string;
}

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
      // createAsyncThunk 안에서의 dispatch
      dispatch(getNoteData());
    } catch ({ response }) {
      return rejectWithValue(response.data.error);
    }
  }
);

// 게시글 정보 가져오기
export const getNoteItemInfo = createAsyncThunk(
  'note/getNoteItemInfo',
  async (_id: string, { rejectWithValue }) => {
    try {
      const { data } = await Api.get(`posts/${_id}`);
      return data;
    } catch ({ response }) {
      return rejectWithValue(response.data.error);
    }
  }
);

// 게시글 수정하기
export const onSubmitUpdateForm = createAsyncThunk(
  'note/onSubmitUpdateForm',
  async (_id: string, { getState, rejectWithValue }: any) => {
    try {
      const { note } = getState();
      const { title, contents } = note.noteItemInfo;
      const apiParams = { title, contents };
      await Api.put(`posts/${_id}`, apiParams);
      history.push('/');
    } catch ({ response }) {
      return rejectWithValue(response.data.error);
    }
  }
);

// 초기 state
const initialState: NoteState = {
  noteList: null,
  noteItemInfo: {
    title: '',
    contents: ''
  },
  isMenuOpen: false,
  showAddMenuList: ''
};

const note = createSlice({
  name: 'note',
  initialState,
  reducers: {
    // 등록 취소
    cancelHandler: () => {
      history.goBack();
    },
    // value값 변경
    onChangeValue: (state: any, { payload }) => {
      const { name, value } = payload;
      state.noteItemInfo[name] = value;
    },
    // 데이터 초기화
    clear: () => initialState,
    // 메뉴 핸들러
    menuController: (state: any, { payload }) => {
      state.isMenuOpen = payload;
    },
    // 메모등록 메뉴 노출핸들러
    addMenuHandler: (state: any, { payload }) => {
      state.showAddMenuList = payload;
    }
  },
  extraReducers: (builder) => {
    // 전체 게시글 가져오기 실행전
    builder.addCase(getNoteData.pending, (state, { payload }) => {});
    // 전체 게시글 가져오기 성공
    builder.addCase(getNoteData.fulfilled, (state, { payload }) => {
      state.noteList = payload;
    });
    // 전체 게시글 가져오기 실패
    builder.addCase(getNoteData.rejected, (state, { payload }) => {});
    // 특정 게시글 정보 가져오기 성공
    builder.addCase(getNoteItemInfo.fulfilled, (state, { payload }) => {
      state.noteItemInfo = payload;
    });
  }
});

export const {
  cancelHandler,
  onChangeValue,
  clear,
  menuController,
  addMenuHandler
} = note.actions;
export default note.reducer;
