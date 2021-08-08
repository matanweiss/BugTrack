import { useEffect, useState } from 'react';
import { Route, Switch, useLocation } from 'react-router-dom';
import { getLists } from './firebase';
import Dashboard from './pages/Dashboard';
import ForgotPassword from './pages/forgotPassword';
import Home from './pages/Home';
import Item from './pages/Item';
import Login from './pages/Login';
import Register from './pages/Register';
import "./tailwind.css";

function App() {

  const location = useLocation();
  const [isProjectSelected, setIsProjectSelected] = useState(false);
  const [selectedProject, setSelectedProject] = useState('');
  const [lists, setLists] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isProjectSelected) getLists(selectedProject).then(lists => {
      setLists(lists);
      setIsLoading(false);
    });
  }, [isProjectSelected])

  const dashboardProps = { 
    isProjectSelected, setIsProjectSelected, selectedProject, setSelectedProject, lists, setLists, isLoading
   };

  return (
    <Switch location={location} key={location.key}>
      <Route exact path="/">
        <Home />
      </Route>
      <Route path="/login">
        <Login />
      </Route>
      <Route path="/register">
        <Register />
      </Route>
      <Route exact path="/dashboard">
        <Dashboard props={dashboardProps} />
      </Route>
      <Route path="/dashboard/:list/:id">
        <Item selectedProject={selectedProject}/>
      </Route>
      <Route path="/forgot-password">
        <ForgotPassword />
      </Route>
    </Switch>
  );
}

export default App;
