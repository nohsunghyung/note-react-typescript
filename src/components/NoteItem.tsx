interface PropsInfo {
  list: ListInfo | any;
  onDelete: Function;
}

interface ListInfo {
  _id: string | any;
  contents: string | any;
  createdAt: string | any;
  createdBy: string | any;
  title: string | any;
  updatedAt: string | any;
}

// 노트 리스트 컴포넌트
const NoteItem = (props: PropsInfo) => {
  const { list, onDelete } = props;
  const { _id, title, contents, updatedAt } = list;
  // api 호출로 받아온 data는 any를 넣어줘야됨
  return (
    <li>
      <div className="post-title">{title}</div>
      <div className="post-contents">{contents}</div>
      <div className="post-time">
        {updatedAt}
        <i className="icon ion-md-create">수정</i>
        <i className="icon ion-md-trash" onClick={() => onDelete(_id)}>
          삭제
        </i>
      </div>
    </li>
  );
};

export default NoteItem;
