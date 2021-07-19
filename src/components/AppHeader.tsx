import React from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../modules/form';

interface HeaderProps {
  token: string;
}

const AppHeader = ({ token }: HeaderProps) => {
  const dispatch = useDispatch();
  // 로그아웃
  const logoutHandler = () => {
    const confirmCheck = window.confirm('로그아웃 하시겠습니까?');
    if (confirmCheck) {
      dispatch(logout());
    }
  };
  return (
    <header>
      <div>
        <NavLink to={'/'} className="logo">
          NOTE
        </NavLink>
      </div>
      <div className="navigations">
        {token ? (
          <button onClick={logoutHandler}>로그아웃</button>
        ) : (
          <>
            <NavLink to="/">로그인</NavLink>
            <NavLink to="/signup">회원가입</NavLink>
          </>
        )}
      </div>
    </header>
  );
};

export default AppHeader;
