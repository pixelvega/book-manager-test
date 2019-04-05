import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import FilterCheck from "./FilterCheck";

class BooksList extends Component {
  mapBooks(list, updateBook, deleteBook) {
    const rowBook = list.map((book, index) => {
      return (
        <tr className="table__tr" key={index}>
          <td className="table__td table__td-title">{book.title}</td>
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
          <td className="table__td table__td-btn">
            <button
              className="btn btn-update"
              onClick={() => {
                return updateBook(book.title, book.prize, book.id, book.genre);
              }}
            >
              <i className="fas fa-edit" />
            </button>
          </td>
          <td className="table__td table__td-btn">
            <button
              className="btn btn-delete"
              onClick={() => {
                return deleteBook(book.id, book.title);
              }}
            >
              <i className="fas fa-trash-alt" />
            </button>
          </td>
        </tr>
      );
    });
    return rowBook;
  }
  render() {
    const {
      allBooks,
      booksList,
      handleFilterGenres,
      groupedGenres,
      updateBook,
      deleteBook
    } = this.props;
    if (booksList.length >= 0) {
      return (
        <main className="main">
          <div className="catalogue_header">
            <h2>Catalogue of books</h2>
            <p>
              Showing{" "}
              <span className="catalogue_header-p-number">{`${
                booksList.length
              }`}</span>{" "}
              of{" "}
              <span className="catalogue_header-p-number">{`${
                allBooks.length
              }`}</span>{" "}
              books
            </p>
          </div>
          <div className="catalogue_wrapper">
            <div className="FilterCheck">
              <FilterCheck
                booksList={booksList}
                groupedGenres={groupedGenres}
                handleFilterGenres={handleFilterGenres}
              />
            </div>
            <div className="catalogue">
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
      return <div>There is no data.</div>;
    }
  }
}

export default withRouter(BooksList);
