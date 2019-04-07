import React, { Component } from "react";
import CustomLink from "./CustomLink";
import { ReactComponent as Logo } from "../images/books-stack-of-three.svg";

class Header extends Component {
  render() {
    const { pathname, clearForm } = this.props;
    return (
      <header className="Header">
        <div className="Header_img">
          <Logo />
        </div>
        <nav className="Header_nav">
          <li className="Header_nav-link">
            <CustomLink to={"/"} pathname={pathname} linkName={"Catalogue"} />
          </li>
          <li className="Header_nav-link">
            <CustomLink
              to={"/AddBook/"}
              pathname={pathname}
              linkName={"Add book"}
              clearForm={clearForm}
            />
          </li>
          <li className="Header_nav-link">
            <CustomLink
              to={"/EditGenres/"}
              pathname={pathname}
              linkName={"Edit genres"}
            />
          </li>
        </nav>
      </header>
    );
  }
}

export default Header;
