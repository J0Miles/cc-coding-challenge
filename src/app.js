import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import "./app.css";
import Recipes from "./components/Recipes/listRecipes.jsx";
import AddRecipe from "./components/Add/addRecipe.jsx";

class App extends Component {
  render() {
return (
    <div>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <a href="/recipes" className="navbar-brand">
          CC-Coding-Challenge
        </a>
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={"/recipes"} className="nav-link">
              Recipes
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/add"} className="nav-link">
              Add
            </Link>
          </li>
        </div>
      </nav>

      <div className="container mt-3">
        <Switch>
          <Route exact path={["/", "/recipes"]} component={Recipes} />
          <Route exact path="/add" component={AddRecipe} />
          <Route path="/recipes/:id" component={Recipes} />
        </Switch>
      </div>
    </div>
  );
  }
}

export default App;
