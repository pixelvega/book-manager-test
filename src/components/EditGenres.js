import React, { Component } from "react";

class EditGenres extends Component {
  render() {
    const { groupedGenres, handleEditGenre } = this.props;
    if (groupedGenres.length > 0) {
      const arrGenres = groupedGenres.map(genre => {
        return genre;
      });

      const uniqueGenres = [...new Set(arrGenres)];

      const genresRadio = uniqueGenres.map((genre, index) => {
        return (
          <li key={index} className="FilterCheck_nav-item">
            <label>
              <input
                className="option-genre-input"
                id={genre}
                type="radio"
                value={genre}
                name="edit"
                onClick={handleEditGenre}
              />
              <p className="option-genre-label">{genre}</p>
            </label>
          </li>
        );
      });

      return (
        <div className="FilterCheck_wrapper">
          <h3 className="FilterCheck_title">Select genre to edit:</h3>
          <ul className="FilterCheck_nav" onChange={this.handleEditGenre}>
            {genresRadio}
          </ul>
        </div>
      );
    } else {
      return <div>CheckboxList</div>;
    }
  }
}

export default EditGenres;
