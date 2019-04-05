import React, { Component } from "react";
import { NavLink, withRouter } from "react-router-dom";

class Header extends Component {
  render() {
    const {
      checkView,
      clearForm,
      discardChanges,
      newPathname,
      pathname
    } = this.props;

    return (
      <header className="Header">
        <div className="Header_img">
          {/* <img
            src="https://img.icons8.com/ios/50/000000/book-filled.png"
            alt="logo Book Store"
          /> */}
          <i className="fas fa-book" />
        </div>
        <nav className="Header_nav">
          <li className="Header_nav-link">
            <NavLink
              className="Link"
              to={{
                pathname: "/"
              }}
              replace
              onClick={e => checkView(e, "/")}
            >
              Catalogue
            </NavLink>
          </li>
          <li className="Header_nav-link">
            <NavLink
              className="Link"
              to={{
                pathname: "/AddBook/"
              }}
              replace
              onClick={e => checkView(e, "/AddBook/")}
            >
              New book
            </NavLink>
          </li>
          <li className="Header_nav-link">
            <NavLink
              className="Link"
              to={{
                pathname: "/EditGenres/"
              }}
              replace
              onClick={e => checkView(e, "/EditGenres/")}
            >
              Edit Genres
            </NavLink>
          </li>
        </nav>
      </header>
    );
  }
}

export default withRouter(Header);
