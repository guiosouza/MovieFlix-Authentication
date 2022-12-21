import Navbar from "components/Navbar";
import Login from "pages/Login";
import MovieList from "pages/PrivatePages/MovieList";
import { BrowserRouter, Route, Switch } from "react-router-dom";

const Routes = () => {
  return (
    <BrowserRouter>
    <Navbar/>
      <Switch>
        <Route path="/" exact>
          <Login />
        </Route>
        <Route path="/movies" >
          <MovieList/>
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
