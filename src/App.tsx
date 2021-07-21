import React, { useEffect } from 'react';
import Routes from './routes/Routes';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './modules';
import AppHeader from './components/AppHeader';
import { menuController } from './modules/note';

const App = () => {
  const dispatch = useDispatch();
  // login store에 정의된 token값
  const { token } = useSelector((state: RootState) => state.form);
  useEffect(() => {
    dispatch(menuController(false));
  }, [dispatch, token]);
  return (
    <div className={`container ${token ? 'fixed' : ''}`}>
      <AppHeader token={token} />
      <Routes token={token} />
    </div>
  );
};

export default App;
