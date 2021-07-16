import { useSelector } from 'react-redux';
import { RootState } from '../modules';
import { UiStoreState } from '../modules/ui';

// 로딩바

const LoadingBar = () => {
  const { loadingBar } = useSelector<RootState, UiStoreState>(
    (state) => state.ui
  );
  return (
    <div id="loading" style={{ display: loadingBar ? 'block' : 'none' }}></div>
  );
};

export default LoadingBar;
