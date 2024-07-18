import React, { Component } from "react";
import PropTypes from 'prop-types';
import '../App.css'; // Ensure you import the CSS file

export class NewsItem extends Component {
  render() {
    let { title, description, imgUrl, newsUrl, author, date, source } = this.props;
    return (
      <div className="card h-100 mt-1" style={{ position: "relative" }}>
        <div className="ribbon">
          <span>{source}</span>
        </div>
        <img src={imgUrl} className="card-img-top" alt="News Thumbnail" />
        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          <p className="card-text">{description}</p>
          <a href={newsUrl} target="_blank" rel="noopener noreferrer" className="btn btn-dark">
            Read More
          </a>
          <p className="card-text">
            <small className="text-muted">
              By <b>{author}</b> on <b>{date}</b>
            </small>
          </p>
        </div>
      </div>
    );
  }
}

NewsItem.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  imgUrl: PropTypes.string.isRequired,
  newsUrl: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  source: PropTypes.string.isRequired,
};

export default NewsItem;
