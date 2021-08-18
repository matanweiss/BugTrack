import { useState } from 'react';
import { Route, Switch, useLocation } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import ForgotPassword from './pages/forgotPassword';
import Home from './pages/Home';
import Item from './pages/Item';
import Login from './pages/Login';
import Register from './pages/Register';
import "./tailwind.css";
import { QueryClient, QueryClientProvider, useQuery } from 'react-query'
import SelectProject from './components/SelectProject';
import NavBar from './components/NavBar';

function App() {

  const queryClient = new QueryClient();
  const location = useLocation();
  // const [selectedProject, setSelectedProject] = useState('');
  const [lists, setLists] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [reloadLists, setReloadLists] = useState(false);

  // useEffect(() => {
  //   setIsLoading(true);
  //   if (selectedProject) getLists(selectedProject).then(lists => {
  //     setLists(lists);
  //     setIsLoading(false);
  //   });
  // }, [selectedProject, reloadLists])



  const dashboardProps = {
    // selectedProject, setSelectedProject, 
    lists, setLists, isLoading, reloadLists, setReloadLists
  };

  return (
    <QueryClientProvider client={queryClient}>
      <NavBar />
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
          <SelectProject />
          <Dashboard props={dashboardProps} />
        </Route>
        <Route exact path="/dashboard/:projectId">
          <Dashboard props={dashboardProps} />
        </Route>
        <Route path="/dashboard/:listId/:itemId">
          <Item />
        </Route>
        <Route path="/forgot-password">
          <ForgotPassword />
        </Route>
      </Switch>
    </QueryClientProvider>
  );
}

export default App;
