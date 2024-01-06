import React, { Component } from "react";

export default class NewsItem extends Component {
  render() {
    // destructuring
    let { title, description, imgurl, url, author, date, source } = this.props;
    return (
      <div>
        <div className="col">
          <div className="card h-100">
            <span
              className="position-absolute top-0 translate-middle badge rounded-pill bg-danger"
              style={{ left: "85%", zIndex: "1" }}
            >
              {source}
            </span>
            <img
              src={
                imgurl === null
                  ? "https://user-images.githubusercontent.com/24848110/33519396-7e56363c-d79d-11e7-969b-09782f5ccbab.png"
                  : imgurl
              }
              className="card-img-top"
              alt="..."
              style={{ maxHeight: "250px" }}
            />
            <div className="card-body" style={{ maxHeight: "500px" }}>
              <h5 className="card-title">
                {title === null ? "" : title.slice(0, 73)}...
              </h5>

              <p className="card-text">
                {description === null ? "" : description.slice(0, 120)}
                ...{" "}
                <a href={url} target="_blank">
                  {" "}
                  <strong>readmore</strong>
                </a>
              </p>
              <p className="card-text">
                <small className="text-danger">
                  By {!author ? "Unknown" : author} on{" "}
                  {new Date(date).toGMTString()}
                </small>
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
