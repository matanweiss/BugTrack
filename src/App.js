import { AnimatePresence } from 'framer-motion';
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
    <>
      <AnimatePresence exitBeforeEnter>
        <Switch location={location} key={location.key}>
          <Route exact path="/">
            <Home fadeVariants={fadeVariants} />
          </Route>
          <Route path="/login">
            <Login fadeVariants={fadeVariants} />
          </Route>
          <Route path="/register">
            <Register fadeVariants={fadeVariants} />
          </Route>
          <Route exact path="/dashboard">
            <Dashboard fadeVariants={fadeVariants} />
          </Route>
          <Route path="/dashboard/:id">
            <Item fadeVariants={fadeVariants} />
          </Route>
        </Switch>
      </AnimatePresence>
    </>
  );
}

export default App;
