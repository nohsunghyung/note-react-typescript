import React, { useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../modules/form';
import { menuController } from '../modules/note';
import Logo from '../resources/images/img-logo.png';
import history from '../utils/history';
import { RootState } from '../modules';

interface HeaderProps {
  token: string;
}

const AppHeader = ({ token }: HeaderProps) => {
  const addMenuRef = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();
  const { isMenuOpen, showAddMenuList } = useSelector(
    (state: RootState) => state.note
  );
  // 메모등록 버튼
  const moveToPage = (): void => {
    history.push('/write');
  };
  // 로그아웃
  const logoutHandler = (): void => {
    dispatch(logout());
  };

  // 메뉴 영역 외 클릭시
  const handleClickOutside = (e: MouseEvent): void => {
    if (addMenuRef.current && !addMenuRef.current.contains(e.target as Node)) {
      dispatch(menuController(false));
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [addMenuRef]);

  return (
    <header>
      <div>
        <NavLink to={'/'} className="logo">
          <span className="icon">
            <img src={Logo} alt="" />
          </span>
          <span className="text">SIMPLE NOTE</span>
        </NavLink>
      </div>
      <div className="navigations">
        {token ? (
          <div className="header-menu" ref={addMenuRef}>
            <div
              className="menu-list material-icons"
              onClick={() => dispatch(menuController(true))}
            >
              list
            </div>
            <div
              className="menu-box"
              style={{ display: isMenuOpen ? 'block' : 'none' }}
            >
              {showAddMenuList === 'main' ? (
                <div className="menu-item" onClick={moveToPage}>
                  메모 등록
                </div>
              ) : null}
              <div className="menu-item" onClick={logoutHandler}>
                로그아웃
              </div>
            </div>
          </div>
        ) : (
          <>
            <NavLink exact to="/" className="nav">
              Login
            </NavLink>
            <NavLink exact to="/signup" className="nav">
              SignUp
            </NavLink>
          </>
        )}
      </div>
    </header>
  );
};

export default AppHeader;
