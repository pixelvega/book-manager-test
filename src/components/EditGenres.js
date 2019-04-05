import React, { Component } from "react";

class EditGenres extends Component {
  render() {
    const {
      groupedGenres,
      handleEditGenre,
      handleEditTextGenre,
      saveEditedGenre,
      radioGenre,
      editedGenre
    } = this.props;
    if (groupedGenres.length > 0) {
      const arrGenres = groupedGenres.map(genre => {
        return genre;
      });

      const uniqueGenres = [...new Set(arrGenres)];

      const genresRadio = uniqueGenres.map((genre, index) => {
        return (
          <li key={index} className="FilterCheck_nav-item">
            <label className="option-genre">
              <input
                className="option-genre-input"
                id={genre}
                type="radio"
                value={genre}
                name="edit"
                checked={radioGenre === genre ? true : false}
                onChange={handleEditGenre}
              />
              <p className="option-genre-label">{genre}</p>
            </label>
          </li>
        );
      });

      return (
        <main className="main EditGenres">
          <div className="EditGenres_header">
            <h3 className="EditGenres_title">
              Select genre to modify its name:
            </h3>
            <p className="EditGenes_subtitle">
              *This action modifies the name of the genres stored in each book.
            </p>
          </div>
          <div className="EditGenres_wrapper">
            <ul className="FilterCheck_nav" onChange={this.handleEditGenre}>
              {genresRadio}
            </ul>
            <label>
              <div className="form-new-genre-group">
                <input
                  className="option-genre-input form-input-text"
                  id={radioGenre}
                  type="text"
                  name="edit"
                  value={editedGenre}
                  placeholder={radioGenre}
                  onChange={handleEditTextGenre}
                />
                <button className="btn btn-update" onClick={saveEditedGenre}>
                  <i className="fas fa-check-circle" />
                </button>
              </div>
            </label>
          </div>
        </main>
      );
    } else {
      return <div>CheckboxList</div>;
    }
  }
}

export default EditGenres;
