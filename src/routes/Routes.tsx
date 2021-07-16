import React from 'react';
import { Route } from 'react-router-dom';
import Login from '../pages/Login';
import SignUp from '../pages/SignUp';

// route 관련
const Routes = () => {
  return (
    <>
      {/* 로그인 */}
      <Route
        exact
        path={'/'}
        render={(props: any) => <Login {...props} />}
      ></Route>
      {/* 회원가입 */}
      <Route
        exact
        path={'/signup'}
        render={(props: any) => <SignUp {...props} />}
      ></Route>
    </>
  );
};

export default Routes;
