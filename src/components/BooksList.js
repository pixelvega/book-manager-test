import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import FilterCheck from './FilterCheck';

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
                    <li key={index} className='genre'>{genre.name}</li>
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
    const {booksList, groupedGenres} = this.props;

    return(
      <main className="main">
        <div className="catalog_header">
          <h2>Catalog</h2>
          <p>Total books: {booksList.length}</p>
        </div>
        <div className="catalog_wrapper">
          <div className="FilterCheck">
            <FilterCheck booksList={booksList} groupedGenres={groupedGenres} />
          </div>
          <div className="catalog">
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
          </div>
        </div>
      </main>
    );
  }
}

export default BooksList;