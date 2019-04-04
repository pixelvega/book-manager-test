import React, { Component } from "react";

class FilterCheck extends Component {
  render() {
    const { groupedGenres, handleFilterGenres } = this.props;
    if (groupedGenres.length > 0) {
      const arrGenres = groupedGenres.map(genre => {
        return genre;
      });
      const uniqueGenres = [...new Set(arrGenres)];

      const genres = uniqueGenres.map((genre, index) => {
        return (
          <li key={index} className="FilterCheck_nav-item">
            <label htmlFor={genre} className="option-genre">
              <input
                className="option-genre-input"
                id={genre}
                type="checkbox"
                value={genre}
                name={genre}
                onClick={handleFilterGenres}
              />
              <p className="option-genre-label">{genre}</p>
            </label>
          </li>
        );
      });

      return (
        <div className="FilterCheck_wrapper">
          <h3 className="FilterCheck_title">Select by genre:</h3>
          <ul className="FilterCheck_nav">{genres}</ul>
        </div>
      );
    } else {
      return <div>CheckboxList</div>;
    }
  }
}

export default FilterCheck;
