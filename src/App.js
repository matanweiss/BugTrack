import { Route, Switch, useLocation } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
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
