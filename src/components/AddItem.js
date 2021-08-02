import { useEffect, useRef, useState } from "react";
import { addItem } from "../firebase";

const AddItem = ({ listTitle }) => {

  const input = useRef();
  const div = useRef();
  const [isAddingItem, setIsAddingItem] = useState(false);

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
    input.current.focus();
    input.current.scrollIntoView();
  }

  const handleSubmit = e => {
    e.preventDefault();
    const newItem = { title: input.current.value, bug: false, feature: false };
    addItem('project 1', listTitle, newItem).then(result => {
      setIsAddingItem(false);
      input.current.value = '';
    });
  }

  return (
    <form onSubmit={handleSubmit}>
      <div ref={div} className={`text-4xl min-h-[3.5rem] px-2 flex items-center justify-center text-gray-400 border-2 rounded-lg mx-1 duration-300 ${isAddingItem ? 'border-gray-400 shadow' : 'border-white'} `}>
        <input required ref={input}
          className={`h-full outline-none w-full text-black text-base duration-500 ${isAddingItem ? 'max-w-full' : 'max-w-0'}`}
        />
        <span className={`select-none cursor-pointer duration-300 inline-block 
          transform ${isAddingItem ? 'rotate-45' : ''}`} onClick={handleClick}>
          +
        </span>
        <button>
          <svg className={`w-7 h-7 transition-all duration-300 ${isAddingItem ? 'max-w-full opacity-100' : 'max-w-0 opacity-0'}`} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
        </button>
      </div>
    </form>
  );
}

export default AddItem;