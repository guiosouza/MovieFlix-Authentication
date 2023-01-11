import Navbar from "components/Navbar";
import PrivateRoute from "components/PrivateRoute";
import Login from "pages/Login";
import Movies from "pages/PrivatePages/Movies";
import Reviews from "pages/PrivatePages/Reviews";
import { Route, Router, Switch } from "react-router-dom";
import history from "util/history";

const Routes = () => {
  return (
    <Router history={history}>
      <Navbar />
      <Switch>
        <Route path="/" exact>
          <Login />
        </Route>
        <PrivateRoute path="/movies">
          <Route path="/movies" exact>
            <Movies />
          </Route>
          <Route  path="/movies/1/reviews" exact>
            <Reviews />
          </Route>
        </PrivateRoute>
      </Switch>
    </Router>
  );
};

export default Routes;
