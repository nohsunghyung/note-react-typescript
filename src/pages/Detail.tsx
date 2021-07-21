import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../modules';
import {
  getNoteItemInfo,
  onChangeValue,
  clear,
  onSubmitUpdateForm
} from '../modules/note';
import history from '../utils/history';

// 수정 페이지
const Update = (props: any) => {
  const { noteItemInfo } = useSelector((state: RootState) => state.note);
  const dispatch = useDispatch();
  const { match } = props;
  const _id = match.params.id;
  // input value 변경 함수
  const onChangeValueHandler = (e: any): void => {
    const name = e.target.name;
    const value = e.target.value;

    dispatch(onChangeValue({ name, value }));
  };

  // 취소 버튼
  const cancelHandler = (): void => {
    if (window.confirm('취소하시겠습니까?')) {
      history.goBack();
    }
  };

  // 수정완료 버튼
  const onSubmitUpdateFormHandler = (): void => {
    dispatch(onSubmitUpdateForm(_id));
  };

  useEffect(() => {
    // 게시글 정보 가져오기
    dispatch(getNoteItemInfo(_id));
    return () => {
      // 페이지 이동할때 데이터 초기화
      dispatch(clear());
    };
  }, [dispatch]);
  const { title, contents } = noteItemInfo;
  return (
    <div className="contents">
      <h1 className="page-header">노트</h1>
      <div className="form-wrapper">
        <div>
          <div className="form">
            <label htmlFor="Title">Title</label>
            <input
              type="text"
              id="Title"
              name="title"
              placeholder="제목을 입력해주세요."
              value={title}
              onChange={onChangeValueHandler}
              readOnly
            />
          </div>
          <div className="form">
            <label htmlFor="Contents">Contents</label>
            <textarea
              name="contents"
              id="Contents"
              placeholder="내용을 입력해주세요."
              value={contents}
              onChange={onChangeValueHandler}
              readOnly
            ></textarea>
          </div>
          <button
            type="submit"
            className="btn"
            onClick={onSubmitUpdateFormHandler}
          >
            수정하기
          </button>
          <button type="button" className="btn outline" onClick={cancelHandler}>
            목록으로
          </button>
        </div>
        {/* <p className="log">에러</p> */}
      </div>
    </div>
  );
};

export default Update;
