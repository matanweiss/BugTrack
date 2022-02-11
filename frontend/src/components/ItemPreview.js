import { Link } from "react-router-dom";
import BugTag from "./BugTag";
import DoneTag from "./DoneTag";

const ItemPreview = ({ item, listId }) => {
  return (
    <Link to={`/dashboard/${listId}/${item._id}`}>
      <div className='animate-fadeIn rounded-lg border cursor-default shadow min-h-[3.5rem] mx-1 my-4 p-2 hover:bg-gray-100 transition flex items-center'>
        <span className={`${item.done && 'text-slate-600'} mr-2`}>{item.title}</span>
        {item.bug && <BugTag />}
        {item.done && <DoneTag />}
      </div>
    </Link>
  );
}

export default ItemPreview;