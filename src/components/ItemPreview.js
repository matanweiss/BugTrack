import { Link } from "react-router-dom";

const ItemPreview = ({ listTitle, item }) => {

  return (
    <Link to={`dashboard/${listTitle}/${item.id}`}>
      <div className='animate-fadeIn rounded-lg border cursor-default shadow h-14 mx-1 my-4 p-2 hover:bg-gray-100 transition flex items-center'>
        <span className='truncate'>{item.title}</span>
        {item.bug && (<div className='btn ml-2 self-start text-sm p-1 hover:bg-red-600' >bug</div>)}
        {item.feature && (<div className='btn ml-2 self-start bg-green-600 hover:bg-green-600 text-sm inline p-1' >feature</div>)}
      </div>
    </Link>
  );
}

export default ItemPreview;