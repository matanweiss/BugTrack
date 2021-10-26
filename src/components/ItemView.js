import { useQuery } from "react-query";
import { useParams } from "react-router-dom";

const ItemView = () => {

  const { itemId, listId } = useParams();
  const { isLoading, data } = useQuery('item', () =>
    fetch(process.env.REACT_APP_SERVER_BASE_URL + `/get-item/${listId}/${itemId}`).then(res => res.json())
  );

  const renderSpinner = () =>
    <div className='flex h-full w-full'>
      <svg className='animate-spin m-auto' width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 22C17.5228 22 22 17.5228 22 12H19C19 15.866 15.866 19 12 19V22Z" fill="currentColor" /><path d="M2 12C2 6.47715 6.47715 2 12 2V5C8.13401 5 5 8.13401 5 12H2Z" fill="currentColor" /></svg>
    </div>

  if (isLoading) return renderSpinner();

  return (
    <>
      <div className="flex justify-end">
        {data.bug && (<div className='lg:hidden btn ml-2 self-start text-sm p-1 hover:bg-red-600' >bug</div>)}
        {data.feature && (<div className='lg:hidden btn mx-2 self-start bg-green-600 hover:bg-green-600 text-sm inline p-1' >feature</div>)}
      </div>

      <div className="flex lg:pt-2 w-full">
        <h3 className=''>{data.title}</h3>
        {data.bug && (<div className='hidden lg:block btn ml-2 self-start text-sm p-1 hover:bg-red-600' >bug</div>)}
        {data.feature && (<div className='hidden lg:block btn mx-2 self-start bg-green-600 hover:bg-green-600 text-sm inline p-1' >feature</div>)}
      </div>
      <p className='pt-4 text-gray-400'>
        {data.description ? data.description : 'no description yet'}
      </p>
    </>
  );
}

export default ItemView;