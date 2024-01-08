import React, { Component } from "react";
import Navbar from "./Components/Navbar";
import News from "./Components/News";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoadingBar from "react-top-loading-bar";

export default class App extends Component {
  apikey = process.env.REACT_APP_API_KEY;
  state = {
    progress: 10,
  };

  setProgress = (progress) => {
    this.setState({ progress: progress });
  };
  render() {
    return (
      <div>
        {/* //navbar should be inside the browserrouter and key and exact path is
        mandatory */}
        <BrowserRouter>
          <LoadingBar color="#f11946" progress={this.state.progress} />
          <Navbar></Navbar>
          <Routes>
            <Route
              exact
              path="/"
              element={
                <News
                  setProgress={this.setProgress}
                  apikey={this.apikey}
                  key="general"
                  country="in"
                  category="general"
                ></News>
              }
            ></Route>
            <Route
              exact
              path="/business"
              element={
                <News
                  setProgress={this.setProgress}
                  apikey={this.apikey}
                  key="business"
                  country="in"
                  category="business"
                ></News>
              }
            ></Route>
            <Route
              exact
              path="/entertainment"
              element={
                <News
                  setProgress={this.setProgress}
                  apikey={this.apikey}
                  key="entertainment"
                  country="in"
                  category="entertainment"
                ></News>
              }
            ></Route>
            <Route
              exact
              path="/health"
              element={
                <News
                  setProgress={this.setProgress}
                  apikey={this.apikey}
                  key="health"
                  country="in"
                  category="health"
                ></News>
              }
            ></Route>
            <Route
              exact
              path="/science"
              element={
                <News
                  setProgress={this.setProgress}
                  apikey={this.apikey}
                  key="science"
                  country="in"
                  category="science"
                ></News>
              }
            ></Route>
            <Route
              exact
              path="/sports"
              element={
                <News
                  setProgress={this.setProgress}
                  apikey={this.apikey}
                  key="sports"
                  country="in"
                  category="sports"
                ></News>
              }
            ></Route>
            <Route
              exact
              path="/technology"
              element={
                <News
                  setProgress={this.setProgress}
                  apikey={this.apikey}
                  key="technology"
                  country="in"
                  category="technology"
                ></News>
              }
            ></Route>
          </Routes>
        </BrowserRouter>
      </div>
    );
  }
}
