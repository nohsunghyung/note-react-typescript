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
    history.goBack();
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
  }, [dispatch, _id]);
  const { title, contents } = noteItemInfo;
  return (
    <div className="contents">
      <div className="form-wrapper">
        <div>
          <div className="form">
            <label htmlFor="Title">제목</label>
            <input
              type="text"
              id="Title"
              name="title"
              placeholder="제목을 입력해주세요."
              value={title}
              onChange={onChangeValueHandler}
            />
          </div>
          <div className="form">
            <label htmlFor="Contents">내용</label>
            <textarea
              name="contents"
              id="Contents"
              placeholder="내용을 입력해주세요."
              value={contents}
              onChange={onChangeValueHandler}
            ></textarea>
          </div>
          <div className="btn-wrap">
            <button
              type="button"
              className="btn"
              onClick={onSubmitUpdateFormHandler}
            >
              완료
            </button>
            <button
              type="button"
              className="btn outline"
              onClick={cancelHandler}
            >
              취소
            </button>
          </div>
        </div>
        {/* <p className="log">에러</p> */}
      </div>
    </div>
  );
};

export default Update;
