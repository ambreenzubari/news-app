import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from 'prop-types'

export class News extends Component {
  articles = [];

  static defaultProps = {
    country: "us",
    pageSize: 10,
    category: "general",
  }

  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,

  }
  constructor(props) {
    super(props);
    this.state = { articles: this.articles, loading: false, page: 1 };
    document.title = ` ${this.capitalizeFirstLetter(this.props.category)} -  Info Nest `
  }


  capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  async componentDidMount() {
    this.getData(1)
  }

  formatDateString = (dateString) => {
    let givenDate = new Date(dateString);
    let today = new Date();
    let yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);
    let isToday = givenDate.toDateString() === today.toDateString();
    let isYesterday = givenDate.toDateString() === yesterday.toDateString();

    if (isToday) {
      return "Today";
    } else if (isYesterday) {
      return "Yesterday";
    } else {
      return givenDate.toLocaleDateString(); // or any other date format you prefer
    }
  }



  getData = async (pageNum) => {
    this.setState({ loading: true, articles: [] })
    let url =
      `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=0c6e9cfd0e914b22be720b3bf2b6bddd&pageSize=${this.props.pageSize}&page=${pageNum}`;

    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({ articles: parsedData.articles, totalArticles: parsedData.totalResults, loading: false });
  };
  handlePrevClick = () => {
    this.getData(this.state.page - 1)
    this.setState({ page: this.state.page - 1 });
  };

  handleNextClick = () => {
    if (this.state.page + 1 > Math.ceil(this.state.totalArticles / 20)) {

    } else {
      this.setState({ loading: true })
      this.getData(this.state.page + 1)
      this.setState({ page: this.state.page + 1 });
    }
  };
  render() {
    return (

      <div className="container my-3">
        <h2 className="text-center">News related to {this.capitalizeFirstLetter(this.props.category)}</h2>
        {this.state.loading && <Spinner />}
        {!this.state.loading && (
          <div className="row row-cols-1 row-cols-md-3 g-4">
            {this.state.articles.map((article, index) => (
              <div className="col" key={index}>
                <NewsItem
                  title={article.title}
                  description={article.description}
                  imgUrl={article.urlToImage || "https://about.fb.com/wp-content/uploads/2023/09/GettyImages-686732223.jpg"}
                  newsUrl={article.url}
                  source={article.source.name}
                  author={!article.author ? 'Unknown' : article.author}
                  date={this.formatDateString(article.publishedAt)}
                />
              </div>
            ))}
          </div>
        )}
        {!this.state.loading && (
          <div className="container mt-3">
            <div className="d-flex justify-content-between">
              <button
                disabled={this.state.page <= 1}
                className="btn btn-dark"
                onClick={this.handlePrevClick}
              >
                &larr; Previous
              </button>
              <button
                disabled={this.state.page + 1 > Math.ceil(this.state.totalArticles / 20)}
                className="btn btn-dark"
                onClick={this.handleNextClick}
              >
                Next &rarr;
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default News;
