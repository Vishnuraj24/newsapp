import React, { Component } from "react";
import NewsItem from "./NewsItem";
// import Pagination from "@mui/material/Pagination";
// import Stack from "@mui/material/Stack";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

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
    this.props.setProgress(10);
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=732d5068f3e04b4383f8176ba19b207e&page=1&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });
    let data = await fetch(url);
    this.props.setProgress(30);
    let parseddata = await data.json();
    this.props.setProgress(50);
    this.setState({
      articles: parseddata.articles,
      totalPages: parseddata.totalResults,
      loading: false,
    });
    this.props.setProgress(100);
  }

  // handlePage = async (event, value) => {
  //   this.setState({ currentPage: value }, async () => {
  //     let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=732d5068f3e04b4383f8176ba19b207e&page=${this.state.currentPage}&pageSize=${this.props.pageSize}`;
  //     this.setState({ loading: true });
  //     let data = await fetch(url);
  //     let parseddata = await data.json();
  //     this.setState({ articles: parseddata.articles, loading: false });
  //   });
  // };

  fetchMoreData = async () => {
    this.setState({ currentPage: this.state.currentPage + 1 }, async () => {
      let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=732d5068f3e04b4383f8176ba19b207e&page=${this.state.currentPage}&pageSize=${this.props.pageSize}`;
      let data = await fetch(url);
      let parseddata = await data.json();
      this.setState({
        articles: this.state.articles.concat(parseddata.articles),
        totalPages: parseddata.totalResults,
      });
    });
  };

  render() {
    return (
      <>
        <h1 className="text-center">Newsmonkey - {this.props.category}</h1>
        {this.state.loading && <Spinner></Spinner>}
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalPages}
          loader={<Spinner></Spinner>}
          style={{ overflow: "hidden" }} //to hide the scroll bars thanks to gpt
        >
          <div className="container">
            <div className="row row-cols-1 row-cols-md-3 g-4 my-3">
              {this.state.articles.map((element) => {
                return (
                  // if there is no key it will throw an error - unique
                  <div key={element.url} className="col-md-4">
                    <NewsItem
                      title={element.title}
                      description={element.description}
                      imgurl={element.urlToImage}
                      url={element.url}
                      author={element.author}
                      date={element.publishedAt}
                      source={element.source.name}
                    ></NewsItem>
                  </div>
                );
              })}
            </div>
          </div>
        </InfiniteScroll>
      </>
    );
  }
}
