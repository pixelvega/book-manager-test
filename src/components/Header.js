import React, {Component} from 'react';
import {Link} from 'react-router-dom';

class Header extends Component {
  render() {
    return(
      <div className="Header">
        <div className="Header_img">
          <img src="https://img.icons8.com/ios/50/000000/book-filled.png" alt="logo Book Store" />
        </div>
        <nav className="Header_nav">
          <li className="Header_nav-link"><Link to="/" replace>Catalog</Link></li>
          <li className="Header_nav-link"><Link to="/AddBook/" replace>Add book</Link></li>
          <li className="Header_nav-link"><Link to="/EditGenres/" replace>Edit genres</Link></li>
        </nav>
      </div>
    );
  }
}

export default Header;