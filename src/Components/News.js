import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

export default class News extends Component {
  constructor() {
    super();
    this.state = {
      articles: [],
      loading: false,
      currentPage: 1,
      totalPages: 0,
    };
  }

  async componentDidMount() {
    let url =
      "https://newsapi.org/v2/top-headlines?country=in&category=sports&apiKey=1fc9511d6d10481798397cd157687c1c&page=1&pageSize=21";
    let data = await fetch(url);
    let parseddata = await data.json();
    this.setState({
      articles: parseddata.articles,
      totalPages: parseddata.totalResults,
    });
  }

  handlePage = async (event, value) => {
    this.setState({ currentPage: value }, async () => {
      let url = `https://newsapi.org/v2/top-headlines?country=in&category=sports&apiKey=1fc9511d6d10481798397cd157687c1c&page=${this.state.currentPage}&pageSize=21`;
      let data = await fetch(url);
      let parseddata = await data.json();
      this.setState({ articles: parseddata.articles });
    });
  };

  render() {
    return (
      <div className="container my-3">
        <h1>Newsmonkey - TopHeadlines</h1>
        <div className="row row-cols-1 row-cols-md-3 g-4 my-3">
          {this.state.articles.map((element) => {
            return (
              <NewsItem
                key={element.url}
                title={element.title}
                description={element.description}
                imgurl={element.urlToImage}
                url={element.url}
              ></NewsItem>
            );
          })}
        </div>
        {/* using material ui -- pagination */}
        <div className="container my-3 d-flex justify-content-center">
          <Stack spacing={2}>
            <Pagination
              count={Math.round(this.state.totalPages / 21)} // Set the total number of pages
              color="secondary"
              size="large"
              page={this.state.currentPage}
              onChange={this.handlePage}
            />
          </Stack>
        </div>
      </div>
    );
  }
}
