import React, { Component } from "react";
import { categories, countries, languages } from "../model/parameters";
import { Link } from "react-router-dom";
import "../App.css"
export class NavBar extends Component {
  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            Info Nest
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/">
                  Home
                </Link>
              </li>

              {categories.map((category, index) => (
                <li className="nav-item" key={index}>
                  <Link className="nav-link" to={`/${category.value}`}>
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
           
            <ul className="navbar-nav mb-2 mb-lg-0">
              <li className="nav-item dropdown">
                <Link
                  className="nav-link dropdown-toggle"
                  to="#"
                  id="languagesDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Languages
                </Link>
                <ul className="dropdown-menu dropdown-menu-end dropdown-custom" aria-labelledby="languagesDropdown">
                  {languages.map((language, index) => (
                    <li><Link className="dropdown-item" to="#">{language.name}</Link></li>
                  ))}
                </ul>
              </li>
              <li className="nav-item dropdown">
                <Link
                  className="nav-link dropdown-toggle"
                  to="#"
                  id="countriesDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Countries
                </Link>
                <ul className="dropdown-menu dropdown-menu-end dropdown-custom" aria-labelledby="countriesDropdown">
                  {countries.map((country, index) => (
                    <li><Link className="dropdown-item" to="#">{country.name}</Link></li>
                  ))}
                </ul>
              </li>
            </ul>

            <form className="d-flex ms-3">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
            </form>
          </div>
        </div>
      </nav>
    );
  }
}

export default NavBar;
