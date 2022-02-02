import { useRef, useState } from "react";
import { useMutation, useQuery } from "react-query";
import { useHistory } from "react-router-dom";

const SelectProject = () => {

  const { isLoading, data, refetch } = useQuery('projects', () =>
    fetch(process.env.REACT_APP_SERVER_BASE_URL + '/get-projects', { credentials: 'include' }).then(res => res.json()),
    { onSuccess: (res => { if (res.needAuth) history.push('/login'); }) }
  );

  const mutation = useMutation(e => {
    e.preventDefault();
    return fetch(process.env.REACT_APP_SERVER_BASE_URL + '/create-project', {
      method: 'post',
      body: JSON.stringify({ title: input.current.value, user: data[1] }),
      headers: { 'Content-Type': 'application/json' }
    })
  }, {
    onSuccess: () => {
      refetch();
      setIsEditing(false);
    }
  }
  );

  const input = useRef();
  const history = useHistory();
  const [needToFadeOut, setNeedToFadeOut] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const handleSelection = e => {
    localStorage.setItem('projectTitle', e.target.textContent);
    setNeedToFadeOut(true);
    setTimeout(() => { history.push(`dashboard/${e.target.id}`) }, 290);
  }

  const handleEditMode = e => {
    isEditing ? input.current.blur() : input.current.focus();
    setIsEditing(!isEditing);
    input.current.value = '';
  }

  const renderProjects = () =>
    <>
      {data[0].map(project =>
        <button key={project._id} id={project._id} onClick={handleSelection} className="relative btn hover:bg-red-500 rounded-none" >
          {project.title}
        </button>
      )}

      <button className="btn hover:bg-red-500 rounded-none rounded-b flex justify-center"
        onClick={handleEditMode}
      >
        <svg className={`${isEditing && 'rotate-45'} transition w-6 h-6`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>
        add project
      </button>
    </>

  const renderSpinner = () =>
    <div className='flex h-20 w-full'>
      <svg className='animate-spin m-auto text-red-600' width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 22C17.5228 22 22 17.5228 22 12H19C19 15.866 15.866 19 12 19V22Z" fill="currentColor" /><path d="M2 12C2 6.47715 6.47715 2 12 2V5C8.13401 5 5 8.13401 5 12H2Z" fill="currentColor" /></svg>
    </div>

  return (
    <div className={` w-screen h-screen z-50 absolute flex inset-0 bg-black bg-opacity-40
      ${needToFadeOut ? 'animate-fadeOut' : 'animate-fadeIn'}`}
    >
      <div className="relative pt-4 shadow-xl w-full rounded max-w-3xl flex flex-col bg-white mx-4 my-auto lg:m-auto lg:w-2/3">
        <p className={`${!isEditing && 'opacity-0'} transition absolute lg:text-xl -top-10 text-white left-1/2 -translate-x-1/2`}>
          <span className='hidden lg:inline'>press </span>ENTER to add!
        </p>
        <form onSubmit={mutation.mutate}>
          <input className={`${!isEditing && 'opacity-0 absolute'} text-red-600 text-center w-full lg:text-4xl outline-none px-4 mb-3`}
            placeholder='New Project Title:' ref={input} />
        </form>
        <h4 className={`${isEditing && 'hidden'} text-center mb-4 text-red-600 lg:text-4xl`}>Select your project:</h4>
        {isLoading || mutation.isLoading ? renderSpinner() : renderProjects()}
      </div>
    </div>
  );
}

export default SelectProject;