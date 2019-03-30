import React, { Component } from "react";

class UpdateBookGenres extends Component {
  genreChecked = (genre, e) => {
    const checked = e.target.checked;
    if (genre === checked) {
      return true;
    } else {
      return false;
    }
  };
  render() {
    const { groupedGenres, handleAddGenres, genres } = this.props;
    if (groupedGenres.length > 0) {
      const arrGenres = groupedGenres.map(genre => {
        return genre;
      });

      const uniqueGenres = [...new Set(arrGenres)];

      const genresCheckbox = uniqueGenres.map((genre, index) => {
        return (
          <li key={index} className="FilterCheck_nav-item">
            <label htmlFor={genre} className="option-genre">
              <input
                className="option-genre-input"
                id={genre}
                type="checkbox"
                value={genre}
                name={genre}
                onClick={handleAddGenres}
                checked={genres.includes(genre) ? true : false}
                onChange={e => {
                  this.genreChecked(genre, e);
                }}
              />
              <p className="option-genre-label">{genre}</p>
            </label>
          </li>
        );
      });

      return (
        <div className="FilterCheck_wrapper">
          <h3 className="FilterCheck_title">Select genre:</h3>
          <ul className="FilterCheck_nav">{genresCheckbox}</ul>
        </div>
      );
    } else {
      return <div>CheckboxList</div>;
    }
  }
}

export default UpdateBookGenres;
