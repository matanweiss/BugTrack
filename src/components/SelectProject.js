import { useEffect, useState } from "react";
import { getProjects } from "../firebase";

const SelectProject = ({ setSelectedProject }) => {


  const [needToFadeOut, setNeedToFadeOut] = useState(false);
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const handleSelection = e => {
    setNeedToFadeOut(true);
    setTimeout(() => { setSelectedProject(e.target.id); }, 290);
  }

  useEffect(() => {
    getProjects().then(projects => {
      setProjects(projects.projects);
      setIsLoading(false);
    });
  }, [])

  const renderProjects = () =>
    <>
      {projects.map(project =>
        <button key={project} id={project} className="btn hover:bg-red-500 rounded-none" onClick={handleSelection}>{project}</button>
      )}
      <button className="btn hover:bg-red-500 rounded-none rounded-b flex justify-center" onClick={handleSelection}>
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>
        add project
      </button>
    </>

  const renderSpinner = () =>
    <div className='flex h-20 w-full'>
      <svg className='animate-spin m-auto text-red-600' width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 22C17.5228 22 22 17.5228 22 12H19C19 15.866 15.866 19 12 19V22Z" fill="currentColor" /><path d="M2 12C2 6.47715 6.47715 2 12 2V5C8.13401 5 5 8.13401 5 12H2Z" fill="currentColor" /></svg>
    </div>

  return (
    <div
      style={{ backgroundColor: 'rgba(0, 0, 0, .4)' }}
      className={`font-body w-screen h-screen z-50 absolute flex left-0 right-0 up-0 down-0 
      ${needToFadeOut ? 'animate-fadeOut' : 'animate-fadeIn'}`}
    >
      <div
        className="pt-4 shadow-xl w-full rounded max-w-3xl flex flex-col bg-white mx-4 my-auto md:m-auto md:w-2/3">
        <h3 className="text-center mb-4 text-red-600 md:text-4xl">Select your project:</h3>
        {isLoading ? renderSpinner() : renderProjects()}
      </div>
    </div>
  );
}

export default SelectProject;