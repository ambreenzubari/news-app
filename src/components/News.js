import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import AppContext from "../context/AppContext";
import InfiniteScroll from "react-infinite-scroll-component";
import "../App.css";

export class News extends Component {
  static defaultProps = {
    pageSize: 9,
    category: "business",
  };

  static contextType = AppContext;
  country = { name: "United States", value: "us" };

  static propTypes = {
    pageSize: PropTypes.number,
    category: PropTypes.string,
    API_KEY: PropTypes.string.isRequired,
    setProgress: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: true,
      page: 1,
      totalArticles: 0,
      nextPage: 0,
      noNewsFound: false, // New state to handle no news found
    };
    document.title = ` ${this.capitalizeFirstLetter(
      this.props.category
    )} - Info Nest `;
  }

  capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  async componentDidMount() {
    let data = this.context;
    this.country = data.state.country;
    this.getData();
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
      return givenDate.toLocaleDateString();
    }
  };

  componentDidUpdate(prevProps, prevState, prevContext) {
    const data = this.context;
    if (data.state.country !== this.country) {
      this.country = data.state.country;
      this.getData(1, true);
    }
  }

  fetchMoreData = async () => {
    const { page, articles } = this.state;
    const url = `https://newsdata.io/api/1/latest?apikey=${this.props.API_KEY}&country=${this.country.value}&image=1&category=${this.props.category}&page=${this.state.nextPage}`;
    let response = await fetch(url);
    let parsedData = await response.json();
    if (parsedData.status === "success") {
      this.setState({
        articles: articles.concat(parsedData.results),
        totalArticles: parsedData.totalResults,
        loading: false,
        page: page + 1,
        noNewsFound: parsedData.results.length === 0 && this.state.articles.length === 0, // Check if no news found
      });
    } else {
      console.error("Error fetching data:", parsedData.results.message);
    }
  };

  getData = async (pageNum = 1, isCountry = false) => {
    this.props.setProgress(10);
    this.setState({ loading: true, noNewsFound: false }); // Reset noNewsFound state
    const url = `https://newsdata.io/api/1/latest?apikey=${this.props.API_KEY}&image=1&country=${this.country.value}&category=${this.props.category}`;

    let response = await fetch(url);
    this.props.setProgress(30);
    let parsedData = await response.json();
    this.props.setProgress(60);

    
    if (parsedData.status === "success") {
      this.setState({
        articles: parsedData.results,
        totalArticles: parsedData.totalResults,
        loading: false,
        page: pageNum,
        nextPage: parsedData.nextPage,
        noNewsFound: parsedData.results.length === 0, // Check if no news found
      });
    } else {
      console.error("Error fetching data:", parsedData.results.message);
    }
    this.props.setProgress(100);
  };

  render() {
    const { articles, loading, noNewsFound } = this.state;

    return (
      <div className="container my-3">
        <h2 className="text-center title">
          News related to{" "}
          <strong>
            {this.capitalizeFirstLetter(this.props.category)}
          </strong> in <strong>{this.country.name}</strong>
        </h2>

       
        {loading && !noNewsFound && <Spinner />}
        {noNewsFound && !loading && (
          <div className="alert alert-info text-center">
            No news found for <strong>{this.props.category}</strong> category.
          </div>
        )}
        {articles&&<InfiniteScroll
          className="infinite-scroll-component"
          style={{ overflow: "hidden", width: "100%", paddingTop: "5px" }}
          dataLength={articles.length}
          next={this.fetchMoreData}
          hasMore={articles.length < this.state.totalArticles && !noNewsFound}
          loader={<Spinner />}
        >
          <div
            className="row row-cols-1 row-cols-md-3 g-4"
            style={{ marginBottom: "30px" }}
          >
            {articles&&articles.map((article, index) => (
              <div className="col" key={index}>
                <NewsItem
                  title={article.title}
                  description={article.description}
                  imgUrl={
                    article.image_url ||
                    "https://about.fb.com/wp-content/uploads/2023/09/GettyImages-686732223.jpg"
                  }
                  newsUrl={article.link}
                  source={article.source_id}
                  author={!article.author ? "Unknown" : article.author}
                  source_icon={article.source_icon}
                  date={this.formatDateString(article.pubDate)}
                />
              </div>
            ))}
          </div>
        </InfiniteScroll>}
      </div>
    );
  }
}

export default News;
