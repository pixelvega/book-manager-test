import React, { Component } from "react";
import { withRouter, Prompt } from "react-router-dom";
import UpdateBookGenres from "./UpdateBookGenres";

class AddBook extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isBlocking: true
    };
  }
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
      saveGenre,
      pathname
    } = this.props;

    let sectionTitle = "Add new book";

    if (pathname === "/AddBook/") {
      sectionTitle = "Add new book";
    } else if (pathname === "/EditBook/") {
      sectionTitle = "Edit Book:";
    }
    return (
      <main className="AddBook">
        <Prompt
          when={this.state.isBlocking}
          message={"Are you sure you want to discard the changes?"}
        />
        <h2 className="AddBook_title">{sectionTitle}</h2>
        <div className="AddBook_wrapper">
          <div className="form-title-group">
            <label className="form-title-label">
              <p className="input-legend form-label-title">Title:</p>
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
              <p className="input-legend form-label-title">Price:</p>
              <input
                id="prize"
                className="form-input-text form-input-number-price"
                type="number"
                onChange={handlePrize}
                value={prize}
              />{" "}
              €
            </label>
          </div>
          <div className="form-genres-group">
            <UpdateBookGenres
              groupedGenres={groupedGenres}
              genres={genres}
              handleAddGenres={handleAddGenres}
            />
            <label className="form-new-genre-label">
              <p className="input-legend form-label-title">Add new Genre:</p>
              <div className="form-new-genre-group">
                <input
                  id="new-genre"
                  className="form-input-text"
                  type="text"
                  onChange={handleNewGenre}
                  value={newGenre}
                />
                <button
                  className={`btn btn-add ${
                    newGenre === "" ? "" : "btn-add-icon"
                  }`}
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
                this.setState({ isBlocking: false }, () => {
                  discardChanges(() => {
                    this.setState({ isBlocking: true });
                  });
                });
              }}
            >
              Discard
            </button>
            <button
              className="form-buttons form-button-save"
              onClick={() => {
                this.setState({ isBlocking: false }, () => saveBook(index));
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
