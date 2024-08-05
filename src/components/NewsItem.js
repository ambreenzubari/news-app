import React, { Component } from "react";
import PropTypes from 'prop-types';
import '../App.css'; // Ensure you import the CSS file

export class NewsItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isExpanded: false
    };
  }

  handleToggle = () => {
    this.setState(prevState => ({ isExpanded: !prevState.isExpanded }));
  };

  render() {
    const { title, description, imgUrl, newsUrl, author, date, source, source_icon } = this.props;
    const { isExpanded } = this.state;
    const maxLength = 100;

    // Truncate description if it exceeds maxLength
    const truncatedDescription = description && description.length > maxLength
      ? description.substring(0, maxLength) + '...'
      : description;

    return (
      <div className="card h-100 mt-1 position-relative">
        {/* <div className="ribbon">
          <span>{source}</span>
        </div> */}
        <img src={imgUrl} className="card-img-top" alt="News Thumbnail" />
        {source_icon && (
          <img
            src={source_icon}
            alt="Source Icon"
            className="source-icon"
          />
        )}
        <div className="card-body">
          <h5 className="card-title">{title ? title : ''}</h5>
          <p className="card-text">
            {isExpanded ? description : truncatedDescription}
            {description && description.length > maxLength && (
              <span
                onClick={this.handleToggle}
                className="read-more-less"
                style={{ color: '#007bff', cursor: 'pointer', fontWeight: 'bold' }}
              >
                {isExpanded ? ' Show less' : ' Read more'}
              </span>
            )}
          </p>
          <a href={newsUrl} target="_blank" rel="noopener noreferrer" className="btn btn-dark">
            Read More
          </a>
          <p className="card-text">
            <small className="text-muted">
             Published By <b>{source}</b> on <b>{date}</b>
            </small>
          </p>
        </div>
      </div>
    );
  }
}

NewsItem.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  imgUrl: PropTypes.string,
  newsUrl: PropTypes.string,
  author: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  source: PropTypes.string.isRequired,
  source_icon: PropTypes.string, // Added prop type for source_icon
};

export default NewsItem;
