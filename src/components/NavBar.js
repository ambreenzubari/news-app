import React, { Component, useContext } from "react";
import { categories, countries, languages } from "../model/parameters";
import { Link } from "react-router-dom";
import "../App.css";
import AppContext from "../context/AppContext";

export class NavBar extends Component {
  
  static contextType = AppContext;


  handleCountryChange = (country) => {
    const { dispatch } = this.context;
    dispatch({ type: "SET_COUNTRY", payload: country });
  };

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

            <ul className="navbar-nav mb-2 mb-lg-0 me-3">
              {/* <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  id="languagesDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Languages
                </a>
                <ul className="dropdown-menu dropdown-menu-end dropdown-custom" aria-labelledby="languagesDropdown">
                  {languages.map((language, index) => (
                    <li key={index}>
                      <a
                        className="dropdown-item"
                        onClick={() => this.handleLanguageChange(language.name)}
                      >
                        {language.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </li> */}
              <li className="nav-item dropdown me-3">
                <a
                  className="nav-link dropdown-toggle"
                  id="countriesDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Countries
                </a>
                <ul className="dropdown-menu dropdown-menu-end dropdown-custom" aria-labelledby="countriesDropdown">
                  {countries.map((country, index) => (
                    <li key={index}>
                      <a
                        className="dropdown-item"
                        onClick={() => this.handleCountryChange(country.value)}
                      >
                        {country.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}

export default NavBar;
