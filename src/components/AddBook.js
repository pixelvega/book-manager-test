import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import UpdateBookGenres from "./UpdateBookGenres";

class AddBook extends Component {
  render() {
    const {
      handleTitle,
      title,
      handlePrize,
      prize,
      saveBook,
      index,
      discardChanges,
      groupedGenres,
      handleAddGenres,
      genres,
      handleNewGenre,
      newGenre,
      saveGenre
    } = this.props;

    return (
      <main className="AddBook">
        <h2 className="AddBook_title">Add New Book</h2>
        <div className="AddBook_wrapper">
          <div className="form-title-group">
            <label className="form-title-label">
              <p className="input-legend form-title-title">Title:</p>
              <input
                id="title"
                className="form-input-text form-input-text-title"
                type="text"
                onChange={handleTitle}
                value={title}
              />
            </label>
          </div>
          <div className="form-prize-group">
            <label className="form-prize-label">
              <p className="input-legend form-prize-title">Prize:</p>
              <input
                id="prize"
                className="form-input-text"
                type="number"
                onChange={handlePrize}
                value={prize}
              />
            </label>
          </div>
          <div className="form-genres-group">
            <UpdateBookGenres
              groupedGenres={groupedGenres}
              genres={genres}
              handleAddGenres={handleAddGenres}
            />
            <label className="form-new-genre-label">
              <p className="input-legend form-new-genre-title">
                Add new Genre:
              </p>
              <div className="form-new-genre-group">
                <input
                  id="new-genre"
                  className="form-input-text"
                  type="text"
                  onChange={handleNewGenre}
                  value={newGenre}
                />
                <button
                  className="btn btn-update"
                  onClick={() => {
                    saveGenre();
                  }}
                >
                  <i className="fas fa-check-circle" />
                </button>
              </div>
            </label>
          </div>
          <div className="form-buttons-group">
            <button
              className="form-buttons form-button-discard"
              onClick={() => {
                discardChanges(title, prize, index, genres);
              }}
            >
              Discard
            </button>
            <button
              className="form-buttons form-button-save"
              onClick={() => {
                saveBook(index);
              }}
            >
              Save
            </button>
          </div>
        </div>
      </main>
    );
  }
}

export default withRouter(AddBook);
