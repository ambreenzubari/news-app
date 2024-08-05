import React, { Component } from "react";
import { categories, countries } from "../model/parameters";
import { Link, useLocation } from "react-router-dom";
import "../App.css";
import AppContext from "../context/AppContext";

// Create a functional wrapper to use hooks in class component
const NavBarWithHooks = (props) => {
  const location = useLocation();
  return <NavBar {...props} location={location} />;
};

export class NavBar extends Component {
  static contextType = AppContext;

  constructor(props) {
    super(props);
    this.state = {
      search: "",
      filteredCountries: countries,
      selectedCountry: "United States",
      selectedCategory: this.getCategoryFromPath(props.location.pathname),
      activeIndex: -1,
    };
  }

  getCategoryFromPath(pathname) {
    // Extract the category from the path
    const category = pathname.split("/")[1];
    return categories.find(cat => cat.value === category)?.name || "Category";
  }

  handleCountryChange = (country) => {
    const { dispatch } = this.context;
    dispatch({ type: "SET_COUNTRY", payload: country });
    this.setState({ selectedCountry: country.name, search: "" });
    this.setState({ filteredCountries: countries });
  };

  handleCategoryChange = (category) => {
    this.setState({ selectedCategory: category.name });
  };

  handleSearchChange = (event) => {
    const search = event.target.value.toLowerCase();
    this.setState({
      search,
      filteredCountries: countries.filter((country) =>
        country.name.toLowerCase().includes(search)
      ),
      activeIndex: -1,
    });
  };

  componentDidUpdate(prevProps) {
    // Update the selected category when the location changes
    if (prevProps.location.pathname !== this.props.location.pathname) {
      this.setState({ selectedCategory: this.getCategoryFromPath(this.props.location.pathname) });
    }
  }

  render() {
    const { search, filteredCountries, selectedCountry, selectedCategory, activeIndex } =
      this.state;

    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
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
              {/* Categories Dropdown */}
              <li className="nav-item dropdown">
                <Link
                  className="nav-link dropdown-toggle "
                  to="#"
                  id="categoriesDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Select Category
                  {/* {selectedCategory} */}
                </Link>
                <ul
                  className="dropdown-menu dropdown-menu-end"
                  aria-labelledby="categoriesDropdown"
                >
                  {categories.map((category, index) => (
                    <li key={index}>
                      <Link
                        className="dropdown-item"
                        to={`/${category.value}`}
                        onClick={() => this.handleCategoryChange(category)}
                      >
                        {category.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>

              {/* Country Dropdown */}
              <li className="nav-item dropdown">
                <Link
                  className="nav-link dropdown-toggle "
                  to="#"
                  id="countriesDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  {selectedCountry}
                </Link>
                <ul
                  className="dropdown-menu dropdown-menu-end dropdown-custom"
                  aria-labelledby="countriesDropdown"
                >
                  <li className="px-2">
                    <input
                      type="text"
                      className="form-control my-2"
                      placeholder="Search..."
                      value={search}
                      onChange={this.handleSearchChange}
                    />
                  </li>
                  {filteredCountries.map((country, index) => (
                    <li key={index}>
                      <Link
                        className={`dropdown-item${activeIndex === index ? " active" : ""}`}
                        to="#"
                        onClick={() => this.handleCountryChange(country)}
                        onMouseEnter={() =>
                          this.setState({ activeIndex: index })
                        }
                      >
                        {country.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
            </ul>

            {/* Display Selected Category and Country */}
            {/* <div className="navbar-text ms-auto d-flex align-items-center text-light"> */}
              <div className="me-4 category-bk navbar-text text-light text-align-center">
               {selectedCategory}
              </div>
             
            {/* </div> */}

            {/* Search Input in Navbar */}
            {/* <form className="d-flex ms-3">
              <input
                type="search"
                className="form-control me-2"
                placeholder="Search..."
                aria-label="Search"
                value={search}
                onChange={this.handleSearchChange}
              />
              <button
                className="btn btn-outline-light"
                type="submit"
                onClick={(e) => e.preventDefault()} // Prevent form submission
              >
                Search
              </button>
            </form> */}
          </div>
        </div>
      </nav>
    );
  }
}

export default NavBarWithHooks;
