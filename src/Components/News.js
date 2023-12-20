import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import Spinner from "./Spinner";
import PropTypes from "prop-types";

export default class News extends Component {
  // default prototype
  static defaultProps = {
    country: "in",
    category: "general",
    pageSize: 8,
  };

  static propTypes = {
    country: PropTypes.string,
    category: PropTypes.string,
    pageSize: PropTypes.number,
  };
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
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=1fc9511d6d10481798397cd157687c1c&page=1&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });
    let data = await fetch(url);
    let parseddata = await data.json();
    this.setState({
      articles: parseddata.articles,
      totalPages: parseddata.totalResults,
      loading: false,
    });
  }

  handlePage = async (event, value) => {
    this.setState({ currentPage: value }, async () => {
      let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=1fc9511d6d10481798397cd157687c1c&page=${this.state.currentPage}&pageSize=${this.props.pageSize}`;
      this.setState({ loading: true });
      let data = await fetch(url);
      let parseddata = await data.json();
      this.setState({ articles: parseddata.articles, loading: false });
    });
  };

  render() {
    return (
      <div className="container my-3">
        <h1 className="text-center">Newsmonkey - TopHeadlines</h1>
        {this.state.loading && <Spinner></Spinner>}
        {!this.state.loading && (
          <div className="row row-cols-1 row-cols-md-3 g-4 my-3">
            {this.state.articles.map((element) => {
              return (
                // if there is no key it will throw an error - unique
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
        )}
        {/* using material ui -- pagination */}
        <div className="container my-3 d-flex justify-content-center">
          <Stack spacing={2}>
            <Pagination
              count={Math.round(this.state.totalPages / this.props.pageSize)} // Set the total number of pages
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
