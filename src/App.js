import React, { Component } from "react";
import NavBar from "./components/NavBar";
import News from "./components/News";
import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";
import { categories } from "./model/parameters";

export default class App extends Component {
  render() {
    return (
      <div>
        <Router>
          <NavBar />
          <Routes>
            <Route exact path="/" element={<News pageSize={10}  category="general" key={"general"}/>} />
            {categories.map(category => (
              <Route exact
                key={category.value}
                path={`/${category.value}`}
                element={<News pageSize={10} key={category.value} category={category.value} />}
              />
            ))}
          </Routes>
        </Router>
      </div>
    );
  }
}
