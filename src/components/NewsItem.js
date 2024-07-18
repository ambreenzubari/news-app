import React, { Component } from "react";

export class NewsItem extends Component {
  render() {
    let { title, description, imgUrl, newsUrl } = this.props;
    return (
      <div className="card h-100 mt-1">
        <img src={imgUrl} className="card-img-top" alt="News Thumbnail" />
        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          <p className="card-text">{description}</p>
          <a href={newsUrl} target="_blank" rel="noopener noreferrer" className="btn btn-dark">
            Read More
          </a>
        </div>
      </div>
    );
  }
}

export default NewsItem;
