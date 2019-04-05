import React, { Component } from "react";
import { Link } from "react-router-dom";

class Header extends Component {
  render() {
    const { checkView, clearForm } = this.props;
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
            <Link className="Link" to="/" replace={false} onClick={checkView}>
              Catalogue
            </Link>
          </li>
          <li className="Header_nav-link">
            <Link
              className="Link"
              to="/AddBook/"
              replace={false}
              onClick={clearForm}
            >
              New book
            </Link>
          </li>
          <li className="Header_nav-link">
            <Link
              className="Link"
              to="/EditGenres/"
              replace={false}
              onClick={checkView}
            >
              Edit genres
            </Link>
          </li>
        </nav>
      </header>
    );
  }
}

export default Header;
