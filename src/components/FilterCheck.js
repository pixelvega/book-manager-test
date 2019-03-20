import React, { Component } from 'react';

class FilterCheck extends Component {
  render() {
    const { groupedGenres } = this.props;
    if (groupedGenres.length > 0) {
      const arrGenres = groupedGenres.map((genre) => {
        return genre.name;
      });
      const uniqueGenres = [...new Set(arrGenres)];
      console.log(arrGenres);
      console.log(uniqueGenres);

      const genres = uniqueGenres.map((genre, index) => {
        return (
          <li key={index}>
            <label htmlFor={genre} className="option-genre">
              <input className="option-genre" id={genre} type="checkbox" value={genre} name={genre} />
              <p className="genre">{genre}</p>
            </label>
          </li>
        );
      });

      return (
        <>
          <ul>{genres}</ul>
        </>
      );

    } else {
      console.log(groupedGenres);
      return (
        <div>CheckboxList</div>
      );
    }
  }
}

export default FilterCheck;