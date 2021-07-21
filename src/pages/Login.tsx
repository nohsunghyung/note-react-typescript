import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../modules';
import { LoginState, submitLogin } from '../modules/form';

// state 타입
interface inputsInfo {
  username: string;
  password: string;
}

// 로그인페이지
const Login = () => {
  const dispatch = useDispatch();
  // state 값을 가져올떄는 RootState 추가
  const { errorMsg } = useSelector<RootState, LoginState>(
    (state) => state.form
  );
  const [inputs, setInputs] = useState<inputsInfo>({
    username: '',
    password: ''
  });
  const { username, password } = inputs;

  // input 변경 함수
  const onChangeValue = (e: any): void => {
    const name = e.target.name;
    const value = e.target.value;
    setInputs({
      ...inputs,
      [name]: value
    });
  };

  // 로그인 폼 전송
  const onSubmitForm = (): void => {
    dispatch(submitLogin(inputs));
  };
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
            <div className="btn-wrap">
              <button type="button" className="btn" onClick={onSubmitForm}>
                로그인
              </button>
            </div>
          </div>
          <p className="error-log">{errorMsg}</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
