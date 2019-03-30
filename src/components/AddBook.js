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
      resetForm,
      groupedGenres,
      handleAddGenres
    } = this.props;

    return (
      <>
        <div>AddBook</div>
        <div className="form-title-group">
          <label className="form-title-label">
            <h2 className="form-title-title">Title:</h2>
            <input
              id="title"
              type="text"
              onChange={handleTitle}
              value={title}
            />
          </label>
        </div>
        <div className="form-prize-group">
          <label className="form-prize-label">
            <h2 className="form-prize-title">Prize:</h2>
            <input
              id="prize"
              type="text"
              onChange={handlePrize}
              value={prize}
            />
          </label>
        </div>
        <div className="form-genres-group">
          <UpdateBookGenres
            groupedGenres={groupedGenres}
            handleAddGenres={handleAddGenres}
          />
        </div>
        <div className="form-buttons-group">
          <button
            onClick={() => {
              saveBook(index);
            }}
          >
            Save
          </button>
          <button
            onClick={() => {
              resetForm();
            }}
          >
            Discard
          </button>
        </div>
      </>
    );
  }
}

export default withRouter(AddBook);
