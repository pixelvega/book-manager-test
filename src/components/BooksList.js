import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import FilterCheck from "./FilterCheck";

class BooksList extends Component {
  mapBooks(list, updateBook, deleteBook) {
    const rowBook = list.map((book, index) => {
      return (
        <tr className="table__tr" key={index}>
          <td className="table__td">{book.title}</td>
          <td className="table__td">
            <ul className="genres">
              {book.genre.map((genre, index) => {
                return (
                  <li key={index} className="genre">
                    {genre}
                  </li>
                );
              })}
            </ul>
          </td>
          <td className="table__td">{book.prize}€</td>
          <td className="table__td">
            <button
              className="table_btn"
              onClick={() => {
                return updateBook(book.title, book.prize, book.id, book.genre);
              }}
            >
              Update
            </button>
          </td>
          <td className="table__td">
            <button
              className="table_btn"
              onClick={() => {
                return deleteBook(book.id, book.title);
              }}
            >
              Delete
            </button>
          </td>
        </tr>
      );
    });
    return rowBook;
  }
  render() {
    const {
      booksList,
      handleFilterGenres,
      groupedGenres,
      updateBook,
      deleteBook
    } = this.props;
    if (booksList.length >= 0) {
      return (
        <main className="main">
          <div className="catalog_header">
            <h2>Catalog</h2>
            <p>Total books: {booksList.length}</p>
          </div>
          <div className="catalog_wrapper">
            <div className="FilterCheck">
              FilterCheck Component
              <FilterCheck
                booksList={booksList}
                groupedGenres={groupedGenres}
                handleFilterGenres={handleFilterGenres}
              />
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
                  {this.mapBooks(booksList, updateBook, deleteBook)}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      );
    } else {
      return <div>no hay datos</div>;
    }
  }
}

export default withRouter(BooksList);
