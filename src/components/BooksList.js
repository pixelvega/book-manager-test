import React, {Component} from 'react';
import {Link} from 'react-router-dom';

class BooksList extends Component {
  mapBooks(list) {
    const rowBook = list.map((book, index)=>{
      return(
        <tr className="table__tr" key={index}>
          <td className="table__td table__td--user">{book.title}</td>
          <td className="table__td table__td--times">{book.genre}</td>
          <td className="table__td table__td--sec">{book.prize}€</td>
          <td className="table__td table__td--sec"><button className="table_btn" ><Link to={`/AddBook/`}>Update</Link></button></td>
          <td className="table__td table__td--sec"><button className="table_btn">Delete</button></td>
        </tr>
      );
    });
    return rowBook;
  }
  render() {
    const {booksList} = this.props;

    return(
      <>
        <div>BooksList</div>
        <table className="table" id="table">
        <thead className="table__thead">
          <tr className="table__tr-title">
            <th className="table__th table__th-col1">
              <div className="table__content table__content-col1">
                <p className="table__title">Name</p>
              </div>
            </th>
            <th className="table__th table__th-col2">
              <div className="table__content table__content-col2">
                <p className="table__title">Genre</p>
              </div>
            </th>
            <th className="table__th table__th-col3">
              <div className="table__content table__content-col3">
                <p className="table__title">Prize</p>
              </div>
            </th>
            <th className="table__th table__th-col3">
              <div className="table__content table__content-col3">
                <p className="table__title">Update</p>
              </div>
            </th>
            <th className="table__th table__th-col3">
              <div className="table__content table__content-col3">
                <p className="table__title">Delete</p>
              </div>
            </th>
          </tr>
        </thead>

        <tbody className="table__tbody">
          {this.mapBooks(booksList)}
        </tbody>
      </table>
    </>
    );
  }
}

export default BooksList;