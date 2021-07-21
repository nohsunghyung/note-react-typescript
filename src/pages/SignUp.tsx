import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { submitSignup } from '../modules/form';

interface InputsState {
  username: string;
  password: string;
  nickname: string;
}

// 회원가입 페이지
const SignUp = () => {
  const dispatch = useDispatch();
  const [inputs, setInputs] = useState<InputsState>({
    username: '',
    password: '',
    nickname: ''
  });
  // input value 변경 핸들러
  const onChangeValue = (e: any) => {
    const name = e.target.name;
    const value = e.target.value;
    setInputs({
      ...inputs,
      [name]: value
    });
  };
  // 회원가입 폼전송
  const onSubmitForm = () => {
    dispatch(submitSignup(inputs));
  };
  const { username, password, nickname } = inputs;
  return (
    <div>
      <div className="contents">
        <div className="form-wrapper form-wrapper-sm">
          <div className="form">
            <div>
              <label htmlFor="username">아이디</label>
              <input
                id="username"
                type="text"
                name="username"
                value={username}
                onChange={onChangeValue}
                placeholder="아이디를 입력해주세요."
              />
            </div>
            <div>
              <label htmlFor="password">비밀번호</label>
              <input
                id="password"
                type="password"
                name="password"
                value={password}
                onChange={onChangeValue}
                placeholder="패스워드를 입력해주세요."
              />
            </div>
            <div>
              <label htmlFor="nickname">닉네임</label>
              <input
                id="nickname"
                type="text"
                name="nickname"
                value={nickname}
                onChange={onChangeValue}
                placeholder="닉네임을 입력해주세요."
              />
            </div>
            <div className="btn-wrap">
              <button type="button" className="btn" onClick={onSubmitForm}>
                회원 가입
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
