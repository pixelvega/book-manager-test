import React, { Component } from "react";
import { withRouter } from "react-router-dom";

class AddBook extends Component {
  render() {
    const { handleTitle, title, handlePrize, prize, addNewBook } = this.props;
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
        <button onClick={addNewBook}>Save</button>
      </>
    );
  }
}

export default withRouter(AddBook);
