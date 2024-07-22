import React, { Component } from "react";
import NavBar from "./components/NavBar";
import News from "./components/News";
import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";
import LoadingBar from 'react-top-loading-bar'

import { categories } from "./model/parameters";

export default class App extends Component {

  API_KEY = process.env.REACT_APP_NEWS_API_KEY
  state = {
    progress: 0
  }

  setProgress=(progress) => {
    this.setState({ progress:progress });
  }

  render() {
    return (
      <div>
        <Router>
          <NavBar />
          <LoadingBar
          height={3}
            color='#f11946'
            progress={this.state.progress}
          />
          <Routes>
            <Route exact path="/" element={<News API_KEY={this.API_KEY} setProgress={this.setProgress} pageSize={10} category="general" key={"general"} />} />
            {categories.map(category => (
              <Route exact
                key={category.value}
                path={`/${category.value}`}
                element={<News API_KEY={this.API_KEY} pageSize={10} key={category.value} setProgress={this.setProgress} category={category.value} />}
              />
            ))}
          </Routes>
        </Router>
      </div>
    );
  }
}
