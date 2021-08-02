import { Route, Switch, useLocation } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Home from './components/Home';
import Item from './components/Item';
import Login from './components/Login';
import Register from './components/Register';
import "./tailwind.css";

const fadeVariants = {
  exit: { opacity: 0 },
  initial: { rotateX: '-20deg', opacity: 0 },
  animate: { opacity: 1, rotateX: 0 }
}

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
    </Switch>
  );
}

export default App;
