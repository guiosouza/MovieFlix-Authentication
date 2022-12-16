import Navbar from "components/Navbar";
import Login from "pages/Login";
import { BrowserRouter, Route, Switch } from "react-router-dom";

const Routes = () => {
  return (
    <BrowserRouter>
    <Navbar/>
      <Switch>
        <Route path="/">
          <Login />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
