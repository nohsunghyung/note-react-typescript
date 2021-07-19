import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { submitSignup } from '../modules/form';
import history from '../utils/history';

interface InputsState {
  username: string;
  password: string;
  nickname: string;
}

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
      <h1 className="page-header">회원가입</h1>
      <div className="contents">
        <div className="form-wrapper form-wrapper-sm">
          <div className="form">
            <div>
              <label htmlFor="username">id:</label>
              <input id="username" type="text" name="username" value={username} onChange={onChangeValue} />
            </div>
            <div>
              <label htmlFor="password">pw: </label>
              <input id="password" type="password" name="password" value={password} onChange={onChangeValue} />
            </div>
            <div>
              <label htmlFor="nickname">nickname: </label>
              <input id="nickname" type="text" name="nickname" value={nickname} onChange={onChangeValue} />
            </div>
            <button type="button" className="btn" onClick={onSubmitForm}>
              회원 가입
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
