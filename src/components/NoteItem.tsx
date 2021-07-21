import helper from '../utils/helper';

interface PropsInfo {
  list: ListInfo | any;
  onDelete: Function;
  moveUpdatePage(_id: string): any;
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
  const { list, onDelete, moveUpdatePage } = props;
  const { _id, title, contents, updatedAt } = list;
  // api 호출로 받아온 data는 any를 넣어줘야됨
  return (
    <li>
      <div className="post-inner">
        <div className="post-title">{title}</div>
        <div className="post-contents">{contents}</div>
        <div className="post-time">{helper.convertDateTime(updatedAt)}</div>
      </div>
      <div className="controller">
        <i
          className="icon material-icons edit"
          onClick={() => moveUpdatePage(_id)}
        >
          edit
        </i>
        <i className="icon material-icons delete" onClick={() => onDelete(_id)}>
          delete_sweep
        </i>
      </div>
    </li>
  );
};

export default NoteItem;
