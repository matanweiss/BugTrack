import { useState } from "react";
import { useMutation } from "react-query";
import AddItem from "./AddItem";

const EmptyList = ({ refetch, title, id, projectId, deleteListMutation, isAddingItem, setIsAddingItem }) => {

  const mutation = useMutation(e => {
    e.preventDefault();
    return fetch(`http://localhost:5000/create-list/${projectId}`, {
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

  const renderSpinner = () =>
    <div className='flex h-full w-full'>
      <svg className='animate-spin m-auto' width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 22C17.5228 22 22 17.5228 22 12H19C19 15.866 15.866 19 12 19V22Z" fill="currentColor" /><path d="M2 12C2 6.47715 6.47715 2 12 2V5C8.13401 5 5 8.13401 5 12H2Z" fill="currentColor" /></svg>
    </div>

  if (title) return (
    <div key={id} className="overflow-y-auto relative text-center w-full flex-shrink-0 "
      style={{ scrollbarWidth: 'none', scrollSnapAlign: 'center' }} >
      <h3 className='sticky flex md:block items-center justify-between top-0 bg-white pt-4 pb-2'>
        <span className='md:hidden opacity-0 w-6'>to center</span>
        {title}
        <svg onClick={() => deleteListMutation.mutate(id)} className="md:hidden text-red-400 w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
      </h3>
      <p>this list is empty, add an item!</p>
      <AddItem isAddingItem={isAddingItem} setIsAddingItem={setIsAddingItem} listId={id} refetch={refetch} />
      <svg onClick={() => deleteListMutation.mutate(id)}
        className="hidden md:inline absolute right-0 text-red-400 bottom-4 w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
      </svg>
    </div>
  )

  else return (
    <div key={projectId} className='w-full flex-shrink-0 py-8 md:pt-4' style={{ scrollbarWidth: 'none', scrollSnapAlign: 'center' }}>
      {mutation.isLoading ? renderSpinner() :
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