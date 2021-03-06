import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query'
import Dashboard from './pages/Dashboard';
import Home from './pages/Home';
import Item from './pages/Item';
import Login from './pages/Login';
import Register from './pages/Register';
import SelectProject from './components/SelectProject';
import NavBar from './components/NavBar';
import Faq from "./pages/Faq";
import Contact from "./pages/Contact";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import { useState } from "react";

function App() {

  const queryClient = new QueryClient();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <Router>
      <QueryClientProvider client={queryClient}>
        <NavBar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/login">
            <Login setIsLoggedIn={setIsLoggedIn} />
          </Route>
          <Route path="/register">
            <Register setIsLoggedIn={setIsLoggedIn} />
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
          <Route path="/faq">
            <Faq />
          </Route>
          <Route path="/contact">
            <Contact />
          </Route>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/*">
            <NotFound />
          </Route>
        </Switch>
      </QueryClientProvider>
    </Router>
  );
}

export default App;
