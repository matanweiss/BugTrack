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
import { useState } from "react";
import Faq from "./pages/Faq";
import TermsOfUse from "./TermsOfUse";
import Contact from "./pages/Contact";
import About from "./pages/About";
import NotFound from "./pages/NotFound";

function App() {

  const queryClient = new QueryClient();
  const location = useLocation();
  const [projectTitle, setProjectTitle] = useState('');

  return (
    <QueryClientProvider client={queryClient}>
      <NavBar projectTitle={projectTitle} />
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
          <SelectProject setProjectTitle={setProjectTitle} />
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
        <Route path="/faq">
          <Faq />
        </Route>
        <Route path="/terms-of-use">
          <TermsOfUse />
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
  );
}

export default App;
