import React from 'react';

const Update = () => {
  return (
    <div className="contents">
      <h1 className="page-header">노트 수정</h1>
      <div className="form-wrapper">
        <div>
          <div className="form">
            <label htmlFor="Title">Title</label>
            <input type="text" id="Title" name="title" placeholder="제목을 입력해주세요." value={'title'} />
          </div>
          <div className="form">
            <label htmlFor="Contents">Contents</label>
            <textarea name="contents" id="Contents" placeholder="내용을 입력해주세요."></textarea>
            <div className="validation-chk">숫자체크</div>
          </div>
          <button type="submit" className="btn">
            수정완료
          </button>
          <button type="button" className="btn outline">
            취소
          </button>
        </div>
        {/* <p className="log">에러</p> */}
      </div>
    </div>
  );
};

export default Update;
