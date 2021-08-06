import { Route, Switch, useLocation } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import ForgotPassword from './pages/forgotPassword';
import Home from './pages/Home';
import Item from './pages/Item';
import Login from './pages/Login';
import Register from './pages/Register';
import "./tailwind.css";

function App() {

  const location = useLocation();

  return (
    <Switch location={location} key={location.key}>
      <Route exact path="/">
        <Home />
      </Route>
      <Route path="/login">
        <Login />
      </Route>
      <Route path="/register">
        <Register  />
      </Route>
      <Route exact path="/dashboard">
        <Dashboard />
      </Route>
      <Route path="/dashboard/:list/:id">
        <Item />
      </Route>
      <Route path="/forgot-password">
        <ForgotPassword />
      </Route>
    </Switch>
  );
}

export default App;
