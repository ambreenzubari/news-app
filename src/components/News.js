import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from 'prop-types'
import AppContext from "../context/AppContext";
import InfiniteScroll from "react-infinite-scroll-component";

export class News extends Component {
  articles = [];

  static defaultProps = {
    pageSize: 9,
    category: "general",
  }
  static contextType = AppContext; // Set the context type
  country = ''

  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,

  }
  constructor(props) {
    super(props);
    this.state = { articles: this.articles, loading: true, page: 1, totalArticles: 0 };
    document.title = ` ${this.capitalizeFirstLetter(this.props.category)} -  Info Nest `
  }

  capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  async componentDidMount() {
    let data = this.context
    this.country = data.state.country
    this.getData()
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
  componentDidUpdate(prevProps, prevState, prevContext) {
    const data = this.context;
    if (data.state.country !== this.country) {
      this.country = data.state.country
      this.getData(1)
    }
  }

  fetchMoreData = async () => {
    let url =
      `https://newsapi.org/v2/top-headlines?country=${this.country}&category=${this.props.category}&apiKey=${this.props.API_KEY}&pageSize=${this.props.pageSize}&page=${this.state.page}`;

    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({
      articles: this.state.articles.concat(parsedData.articles),
      totalArticles: parsedData.totalResults, loading: false, page: this.state.page + 1
    });
  };

  getData = async (pageNum) => {
    this.props.setProgress(10)
    if (pageNum) {
      this.setState({ page: pageNum })
    }
    this.setState({ loading: true, articles: [] });
    let url =
      `https://newsapi.org/v2/top-headlines?country=${this.country}&category=${this.props.category}&apiKey=${this.props.API_KEY}&pageSize=${this.props.pageSize}&page=${!pageNum ? this.state.page : pageNum}`;

    let data = await fetch(url);
    this.props.setProgress(30)

    let parsedData = await data.json();
    this.props.setProgress(60)
    this.setState({ articles: parsedData.articles, totalArticles: parsedData.totalResults, loading: false, page: this.state.page + 1 });
    this.props.setProgress(100)

  };

  render() {
    return (
      <div className="container my-3">
        <h2 className="text-center">News related to {this.capitalizeFirstLetter(this.props.category)}</h2>
        {this.state.loading && <Spinner />}
        {
          (
            <InfiniteScroll
              dataLength={this.state.articles.length}
              next={this.fetchMoreData}
              hasMore={(this.state.articles.length < this.state.totalArticles) && ((this.state.page - 1) * this.props.pageSize < this.state.totalArticles)}
              loader={<Spinner />}
            >

              <div className="row row-cols-1 row-cols-md-3 g-4">
                {this.state.articles && this.state.articles.map((article, index) => (
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
            </InfiniteScroll>
          )}

      </div>
    );
  }
}

export default News;