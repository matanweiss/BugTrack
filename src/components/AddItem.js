import { useEffect, useRef } from "react";
import { useMutation } from "react-query";
import { ReactComponent as CheckSVG } from '../assets/check.svg';
import Spinner from "./Spinner";

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
    window.scrollTo(input.current.offsetTop, 0);
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
        {mutation.isLoading ? <Spinner />
          :
          <>
            <span className={`select-none cursor-pointer duration-300 inline-block 
              transform ${isAddingItem ? 'rotate-45' : ''}`} onClick={handlePlusClick}>
              +
            </span>
            <button>
              <CheckSVG className={`w-7 h-7 transition-all duration-300 ${isAddingItem ? 'block' : 'hidden'}`} />
            </button>
          </>
        }
      </div>
    </form>
  );
}

export default AddItem;