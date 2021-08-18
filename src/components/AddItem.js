import { useEffect, useRef, useState } from "react";

const AddItem = ({ listId }) => {

  const input = useRef();
  const div = useRef();
  const [isAddingItem, setIsAddingItem] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    document.addEventListener("mousedown", clickOutsideInput);
    return () => document.removeEventListener("mousedown", clickOutsideInput)
  })

  const clickOutsideInput = e => {
    if (!div.current.contains(e.target)) {
      setIsAddingItem(false);
      input.current.value = '';
    }
  }

  const handleClick = () => {
    setIsAddingItem(!isAddingItem);
    input.current.value = '';
    input.current.focus();
    input.current.scrollIntoView();
  }

  const handleSubmit = e => {
    e.preventDefault();
    const newItem = { title: input.current.value, listId };
    fetch('http://localhost:5000/create-item', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newItem)
    }).then(res => {
      setIsAddingItem(false);
      input.current.value = '';
    }).catch(err => console.error(err.message));
  }

  return (
    <form onSubmit={handleSubmit}>
      <div ref={div} className={`text-4xl min-h-[3.5rem] px-2 md:mb-4 flex items-center justify-center text-gray-400 border-2 rounded-lg mx-1 duration-300 ${isAddingItem ? 'border-gray-400 shadow' : 'border-white'} `}>
        <input required ref={input}
          className={`h-full outline-none w-full text-black text-base duration-500 ${isAddingItem ? 'max-w-full' : 'max-w-0'}`}
        />
        {isLoading ? <svg className='animate-spin' width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 22C17.5228 22 22 17.5228 22 12H19C19 15.866 15.866 19 12 19V22Z" fill="currentColor" /><path d="M2 12C2 6.47715 6.47715 2 12 2V5C8.13401 5 5 8.13401 5 12H2Z" fill="currentColor" /></svg>
          :
          <>
            <span className={`select-none cursor-pointer duration-300 inline-block 
              transform ${isAddingItem ? 'rotate-45' : ''}`} onClick={handleClick}>
              +
            </span>
            <button>
              <svg className={`w-7 h-7 transition-all duration-300 ${isAddingItem ? 'max-w-full opacity-100' : 'max-w-0 opacity-0'}`} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
            </button>
          </>
        }
      </div>
    </form>
  );
}

export default AddItem;