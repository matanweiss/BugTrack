import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import BugTag from "./BugTag";
import DoneTag from "./DoneTag";
import Spinner from "./Spinner";

const ItemView = () => {

  const { itemId, listId } = useParams();
  const { isLoading, data } = useQuery('item', () =>
    fetch(process.env.REACT_APP_SERVER_BASE_URL + `/get-item/${listId}/${itemId}`).then(res => res.json())
  );

  if (isLoading) return <Spinner />

  return (
    <>
      <div className="flex lg:pt-2 justify-between">
        <h3>{data.title}</h3>
        {data.bug && <BugTag />}
        {data.feature && <DoneTag />}
      </div>

      <p className='pt-4 text-gray-400'>
        {data.description ? data.description : 'no description yet'}
      </p>
    </>
  );
}

export default ItemView;