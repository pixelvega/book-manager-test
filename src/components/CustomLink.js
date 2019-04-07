import React, { Component } from "react";
import { NavLink } from "react-router-dom";

class CustomLink extends Component {
  render() {
    const { pathname, to, linkName, clearForm } = this.props;
    if (to === pathname) {
      return <span className="Link LinkActive">{linkName}</span>;
    }
    return (
      <NavLink
        className="Link"
        to={to}
        replace
        onClick={() => {
          if (to === "/AddBook/" && pathname !== "/EditForm/") {
            clearForm();
          }
        }}
      >
        {linkName}
      </NavLink>
    );
  }
}
// activeClassName="active"

export default CustomLink;
