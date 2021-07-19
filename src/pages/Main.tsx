import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import NoteItem from '../components/NoteItem';
import { useDispatch, useSelector } from 'react-redux';
import { getNoteData } from '../modules/note';
import { RootState } from '../modules';

const MainPage = () => {
  const dispatch = useDispatch();
  const { noteList } = useSelector((state: RootState) => state.note);
  useEffect(() => {
    // 노트 데이터 Api 호출
    dispatch(getNoteData());
    // didmount시 dispatch사용할경우 2번째 인자로 dispatch를 넘겨준다
  }, [dispatch]);

  console.log('메인페이지 렌더');
  return (
    <div>
      <h1 className="page-header">학습노트 리스트</h1>
      {noteList ? (
        <>
          {noteList.length ? (
            <div className="main list-container contents">
              <ul>
                <NoteItem />
              </ul>
            </div>
          ) : (
            <div className="empty-content">
              <h3>등록된 학습노트가 없습니다.</h3>
            </div>
          )}
        </>
      ) : null}

      <NavLink to={'/write'} className="create-button">
        <i className="ion-md-add"></i>
      </NavLink>
      {/* <LoadingBar /> */}
    </div>
  );
};

export default MainPage;
