import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from '../pages/Login';
import SignUp from '../pages/SignUp';
import Main from '../pages/Main';
import ErrorPage from '../pages/ErrorPage';
import Write from '../pages/Write';
import Update from '../pages/Update';
import Detail from '../pages/Detail';

interface RoutesProps {
  token: string;
}

// route 관련
const Routes = ({ token }: RoutesProps) => {
  // debugger;
  return (
    <>
      <Switch>
        {/* 로그인, 메인페이지 */}
        <Route
          exact
          path={'/'}
          render={(props: any) =>
            token ? <Main {...props} /> : <Login {...props} />
          }
        ></Route>
        {/* 회원가입 */}
        <Route
          exact
          path={'/signup'}
          render={(props: any) => <SignUp {...props} />}
        ></Route>
        {/* 게시글 등록 */}
        <Route
          exact
          path={'/write'}
          render={(props: any) => <Write {...props} />}
        ></Route>
        {/* 게시글 수정 */}
        <Route
          exact
          path={'/update/:id'}
          render={(props: any) => <Update {...props} />}
        ></Route>
        {/* 게시글 상세 */}
        <Route
          exact
          path={'/detail/:id'}
          render={(props: any) => <Detail {...props} />}
        ></Route>
        {/* 에러페이지 */}
        <Route path="*" component={ErrorPage}></Route>
      </Switch>
    </>
  );
};

export default Routes;
