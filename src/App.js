import "./tailwind.css";
import { Route, Switch, useLocation } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query'
import Dashboard from './pages/Dashboard';
import ForgotPassword from './pages/forgotPassword';
import Home from './pages/Home';
import Item from './pages/Item';
import Login from './pages/Login';
import Register from './pages/Register';
import SelectProject from './components/SelectProject';
import NavBar from './components/NavBar';

function App() {

  const queryClient = new QueryClient();
  const location = useLocation();

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
          <Dashboard />
        </Route>
        <Route exact path="/dashboard/:projectId">
          <Dashboard />
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
