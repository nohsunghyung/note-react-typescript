import React from 'react';
import Routes from './routes/Routes';
import { useSelector } from 'react-redux';
import { RootState } from './modules';
import AppHeader from './components/AppHeader';

const App = () => {
  // login store에 정의된 token값
  const { token } = useSelector((state: RootState) => state.form);
  return (
    <div>
      <AppHeader token={token} />
      <Routes token={token} />
    </div>
  );
};

export default App;
