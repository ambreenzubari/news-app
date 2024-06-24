import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";

export class News extends Component {
  articles = [];
  constructor() {
    super();
    this.state = { articles: this.articles, loading: false, page: 1 };
  }

  async componentDidMount() {
   this.getData(1)
  }

  getData = async (pageNum) => {
    this.setState({loading:true, articles: []})
    let url =
      `https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=0c6e9cfd0e914b22be720b3bf2b6bddd&pageSize=${this.props.pageSize}&page=${pageNum}`;

    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({ articles: parsedData.articles ,totalArticles: parsedData.totalResults, loading:false});
  };
  handlePrevClick = () => {
    this.getData(this.state.page-1)
    this.setState({ page: this.state.page - 1 });
  };

  handleNextClick = () => {
  if(this.state.page+1>Math.ceil(this.state.totalArticles/20)){

  }else{
    this.setState({loading:true})
    this.getData(this.state.page+1)
    this.setState({ page: this.state.page + 1 });
  }
  };
  render() {
    return (
      <div className="container my-3">
        <h2 className="text-center">NEWS APP Top headlines</h2>
        {this.state.loading&&<Spinner/>
        }
      {
        !this.state.loading && 
        <div className="row">
        {this.state.articles.map(
          (article) =>
    (
              <div className="col-md-3" key={article.url}>
                <NewsItem
                  title={
                    article.title && article.title != null
                      ? article.title.slice(0, 45)
                      : ""
                  }
                  description={
                    article.description && article.description != null
                      ? article.description.slice(0, 88)
                      : ""
                  }
                  imgUrl={
                    article.urlToImage && article.urlToImage != ""
                      ? article.urlToImage
                      : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQKXPGqdC8U6PlNnivO43alr7RvRFoW9umR6g&s"
                  }
                  newsUrl={article.url}
                />
              </div>
            )
        )}
      </div>
      }
        <div className="container d-flex justify-content-between">
          <button
            disabled={this.state.page <= 1}
            type="button"
            class="btn btn-dark"
            onClick={this.handlePrevClick}
          >
            &larr; Previous
          </button>
          <button
            type="button"
            class="btn btn-dark"
            onClick={this.handleNextClick}
            disabled={this.state.page+1>Math.ceil(this.state.totalArticles/20)}
          >
            Next &rarr;
          </button>
        </div>
      </div>
    );
  }
}

export default News;
