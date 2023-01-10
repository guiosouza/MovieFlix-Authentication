import Navbar from "components/Navbar";
import Login from "pages/Login";
import MovieList from "pages/PrivatePages/MovieList";
import Reviews from "pages/PrivatePages/Reviews";
import { BrowserRouter, Route, Switch } from "react-router-dom";

const Routes = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Switch>
        <Route path="/" exact>
          <Login />
        </Route>
        <Route path="/movies" exact>
          <MovieList />
        </Route>
        <Route path="/movies/1/reviews" >
          <Reviews />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
