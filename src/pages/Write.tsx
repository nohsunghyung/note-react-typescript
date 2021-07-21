import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { cancelHandler, onSubmitFormHandler, clear } from '../modules/note';

// 게시글 등록 페이지
const Write = () => {
  const dispatch = useDispatch();
  const [inputs, setInputs] = useState({
    title: '',
    contents: ''
  });

  // input value 변경 함수
  const onChangeValue = (e: any): void => {
    const name = e.target.name;
    const value = e.target.value;
    setInputs({
      ...inputs,
      [name]: value
    });
  };

  // 게시글 등록
  const onSubmitForm = (): void => {
    dispatch(onSubmitFormHandler(inputs));
  };

  // 등록 취소
  const cancelForm = () => {
    dispatch(cancelHandler());
  };

  useEffect(() => {
    return () => {
      dispatch(clear());
    };
  });

  const { title, contents } = inputs;
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
              onChange={onChangeValue}
            />
          </div>
          <div className="form">
            <label htmlFor="Contents">내용</label>
            <textarea
              name="contents"
              id="Contents"
              placeholder="내용을 입력해주세요."
              value={contents}
              onChange={onChangeValue}
            ></textarea>
          </div>
          <div className="btn-wrap">
            <button type="button" className="btn" onClick={onSubmitForm}>
              등록
            </button>
            <button type="button" className="btn outline" onClick={cancelForm}>
              취소
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Write;
