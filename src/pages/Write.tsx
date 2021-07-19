import React from 'react';

const Write = () => {
  return (
    <div className="contents">
      <h1 className="page-header">학습노트 등록</h1>
      <div className="form-wrapper">
        <div>
          <div className="form">
            <label htmlFor="Title">Title</label>
            <input type="text" id="Title" name="title" placeholder="제목을 입력해주세요." value={''} />
          </div>
          <div className="form">
            <label htmlFor="Contents">Contents</label>
            <textarea name="contents" id="Contents" placeholder="내용을 입력해주세요." value={''}></textarea>
            <div className="validation-chk">숫자체크</div>
          </div>
          <button type="submit" className="btn">
            등록
          </button>
          <button type="button" className="btn outline">
            취소
          </button>
        </div>
      </div>
    </div>
  );
};

export default Write;
