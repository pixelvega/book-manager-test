import React, {Component} from 'react';
import {Link} from 'react-router-dom';

class BooksList extends Component {
  mapBooks(list) {
    const rowBook = list.map((book, index)=>{
      return(
        <tr className="table__tr" key={index}>
          <td className="table__td">{book.title}</td>
          <td className="table__td">
          <ul className='genres'>
            {book.genre.map((genre, index)=>{
                return(
                    <li key={index} className='genre'>{genre}</li>
                );
            })}
            </ul>
          </td>
          <td className="table__td">{book.prize}€</td>
          <td className="table__td"><button className="table_btn" ><Link to={`/AddBook/`}>Update</Link></button></td>
          <td className="table__td"><button className="table_btn">Delete</button></td>
        </tr>
      );
    });
    return rowBook;
  }
  render() {
    const {booksList} = this.props;

    return(
      <main className="main">
        <h2>Catalog</h2>
        <p>Total books: {booksList.length}</p>
        <table className="table" id="table">
        <thead className="table__thead">
          <tr className="table__tr-title">
            <th className="table__th">
              <div className="table__content">
                <p className="table__title">Title</p>
              </div>
            </th>
            <th className="table__th">
              <div className="table__content">
                <p className="table__title">Genre</p>
              </div>
            </th>
            <th className="table__th">
              <div className="table__content">
                <p className="table__title">Prize</p>
              </div>
            </th>
            <th className="table__th">
              <div className="table__content">
                <p className="table__title">Update</p>
              </div>
            </th>
            <th className="table__th">
              <div className="table__content">
                <p className="table__title">Delete</p>
              </div>
            </th>
          </tr>
        </thead>

        <tbody className="table__tbody">
          {this.mapBooks(booksList)}
        </tbody>
      </table>
    </main>
    );
  }
}

export default BooksList;