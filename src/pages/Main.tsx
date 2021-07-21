import React, { useEffect } from 'react';
import NoteItem from '../components/NoteItem';
import { useDispatch, useSelector } from 'react-redux';
import {
  getNoteData,
  onDeleteHandler,
  addMenuHandler,
  menuController,
  clear
} from '../modules/note';
import { RootState } from '../modules';
import history from '../utils/history';

// 메인페이지
const MainPage = () => {
  const dispatch = useDispatch();
  const { noteList } = useSelector((state: RootState) => state.note);
  // 게시글 삭제
  const onDelete = (_id: string): void => {
    dispatch(onDeleteHandler(_id));
  };
  // 수정페이지 이동
  const moveUpdatePage = (_id: string): void => {
    history.push(`/update/${_id}`);
  };
  useEffect(() => {
    // dispatch(menuController(false));
    // 노트 데이터 Api 호출
    dispatch(getNoteData());
    // didmount시 dispatch사용할경우 2번째 인자로 dispatch를 넘겨준다
    dispatch(addMenuHandler('main'));
    return () => {
      // 페이지 이동할때 데이터 초기화
      dispatch(clear());
      dispatch(addMenuHandler(''));
      dispatch(menuController(false));
    };
  }, [dispatch]);
  return (
    <div className="main-contents">
      {noteList ? (
        <>
          {noteList.length ? (
            <div className="main list-container contents">
              <ul>
                {noteList.map((item: any) => {
                  return (
                    <NoteItem
                      key={item._id}
                      list={item}
                      onDelete={onDelete}
                      moveUpdatePage={moveUpdatePage}
                    />
                  );
                })}
              </ul>
            </div>
          ) : (
            <div className="empty-content">
              <h3>등록된 메모가 없습니다.</h3>
            </div>
          )}
        </>
      ) : null}
    </div>
  );
};

export default MainPage;
