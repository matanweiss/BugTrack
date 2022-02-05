import { useEffect, useRef } from "react";
import { useMutation } from "react-query";

const AddItem = ({ isAddingItem, setIsAddingItem, listId, refetch }) => {

  const mutation = useMutation(e => {
    e.preventDefault();
    return fetch(process.env.REACT_APP_SERVER_BASE_URL + `/create-item/${listId}`, {
      method: 'post',
      body: JSON.stringify({ title: input.current.value }),
      headers: { 'Content-Type': 'application/json' },
    })
  }, {
    onSuccess: () => {
      setIsAddingItem(false);
      input.current.value = '';
      refetch();
    }
  }
  );

  const input = useRef();
  const div = useRef();

  const handlePlusClick = () => {
    setIsAddingItem(!isAddingItem);
    input.current.value = '';
    input.current.focus();
    setTimeout(() => {
      input.current.scrollIntoView(true);
    }, 500);

  }

  const handleEscKey = e => {
    if (e.key === 'Escape') setIsAddingItem(false);
  }

  const handleClickOutside = e => {
    if (div.current && !div.current.contains(e.target)) setIsAddingItem(false);
  }

  useEffect(() => {
    document.addEventListener('keydown', handleEscKey, true);
    document.addEventListener('click', handleClickOutside, true);
    return () => {
      document.removeEventListener('keydown', handleEscKey, true);
      document.removeEventListener('click', handleClickOutside, true);
    };
  }, []);

  return (
    <form onSubmit={mutation.mutate}>
      <div ref={div} className={`text-4xl min-h-[3.5rem] px-2 lg:mb-4 flex items-center justify-center text-gray-400 border-2 rounded-lg mx-1 duration-300 ${isAddingItem ? 'border-gray-400 shadow' : 'border-white'} `}>
        <input required ref={input}
          className={`h-full outline-none w-full text-black text-base duration-500 ${isAddingItem ? 'max-w-full' : 'max-w-0'}`}
        />
        {mutation.isLoading ? <svg className='animate-spin' width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 22C17.5228 22 22 17.5228 22 12H19C19 15.866 15.866 19 12 19V22Z" fill="currentColor" /><path d="M2 12C2 6.47715 6.47715 2 12 2V5C8.13401 5 5 8.13401 5 12H2Z" fill="currentColor" /></svg>
          :
          <>
            <span className={`select-none cursor-pointer duration-300 inline-block 
              transform ${isAddingItem ? 'rotate-45' : ''}`} onClick={handlePlusClick}>
              +
            </span>
            <button>
              <svg className={`w-7 h-7 transition-all duration-300 ${isAddingItem ? 'block' : 'hidden'}`} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
            </button>
          </>
        }
      </div>
    </form>
  );
}

export default AddItem;