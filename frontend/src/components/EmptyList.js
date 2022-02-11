import { useState } from "react";
import { useMutation } from "react-query";
import { ReactComponent as TrashIconSVG } from '../assets/TrashIcon.svg';
import AddItem from "./AddItem";
import Spinner from "./Spinner";

const EmptyList = ({ refetch, title, id, projectId, deleteListMutation, isAddingItem, setIsAddingItem }) => {

  const mutation = useMutation(e => {
    e.preventDefault();
    return fetch(process.env.REACT_APP_SERVER_BASE_URL + `/create-list/${projectId}`, {
      method: 'post',
      body: JSON.stringify({ title: titleInput }),
      headers: { 'Content-Type': 'application/json' },
    })
  },
    {
      onSuccess: () => {
        refetch();
      }
    }
  );

  const [titleInput, setTitleInput] = useState('');

  if (title) return (
    <div key={id} className="overflow-y-auto relative text-center w-full flex-shrink-0 "
      style={{ scrollbarWidth: 'none', scrollSnapAlign: 'center' }} >
      <h3 className='sticky flex lg:block items-center justify-between top-0 bg-white lg:pt-4 pb-2'>
        <span className='lg:hidden opacity-0 w-6 select-none'>to center</span>
        {title}
        <TrashIconSVG onClick={() => deleteListMutation.mutate(id)} className="lg:hidden text-red-400 w-6 h-6" />
      </h3>
      <p>this list is empty, add an item!</p>
      <AddItem isAddingItem={isAddingItem} setIsAddingItem={setIsAddingItem} listId={id} refetch={refetch} />
      <TrashIconSVG onClick={() => deleteListMutation.mutate(id)}
        className="hidden lg:inline absolute right-0 text-red-400 bottom-4 w-6 h-6"
      />
    </div>
  )

  else return (
    <div key={projectId} className='w-full flex-shrink-0 py-8 lg:pt-4' style={{ scrollbarWidth: 'none', scrollSnapAlign: 'center' }}>
      {mutation.isLoading ? <Spinner />
        :
        <>
          <h3 className='text-center'>Add a new list!</h3>
          <form onSubmit={e => mutation.mutate(e)} className='relative mt-4'>
            <input required onChange={e => setTitleInput(e.target.value)} placeholder='List Title' className="peer placeholder-input" />
            <label className='placeholder-label'>List Title</label>
          </form>
        </>
      }
    </div>
  )
}

export default EmptyList;