import React, { Component } from "react";
import "./App.scss";
import { Switch, Route, withRouter } from "react-router-dom";
import Header from "./components/Header";
import BooksList from "./components/BooksList";
import AddBook from "./components/AddBook";
import EditGenres from "./components/EditGenres";
import { fetchBooks } from "./services/booksService";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      booksList: [],
      groupedGenres: [],
      genresSelected: [],
      title: "",
      prize: ""
    };
    this.handleFilterGenres = this.handleFilterGenres.bind(this);
    this.filterByGenres = this.filterByGenres.bind(this);
  }

  getBooks() {
    fetchBooks().then(data => {
      this.setState({
        booksList: data
      });
      this.getGenres(data);
    });
  }

  getGenres(booksList) {
    const genres = booksList.map(book => {
      return book.genre;
    });
    let groupedGenres = [];
    for (let i = 0; i < genres.length; i++) {
      let arrGenres = genres[i];
      //console.log("arrGenres: ", i, arrGenres);
      for (let j = 0; j < arrGenres.length; j++) {
        let genre = arrGenres[j];
        //console.log("genre", j, genre);
        groupedGenres.push(genre);
      }
    }
    //console.log("groupedGenres", groupedGenres);
    this.setState({
      groupedGenres: groupedGenres
    });
  }

  handleUserGroups(e) {
    const userGroupsTarget = e.currentTarget.value;

    this.setState(prevState => {
      const { groupsList } = prevState;

      if (groupsList.indexOf(userGroupsTarget) === -1) {
        groupsList.push(userGroupsTarget);
      } else {
        groupsList.splice(groupsList.indexOf(userGroupsTarget), 1);
      }

      return { groupsList: groupsList };
    });
  }

  handleFilterGenres(e) {
    const checkBoxActive = e.target.value;
    const { booksList } = this.state;
    //console.log("checkBoxActive", checkBoxActive);
    this.setState(
      prevState => {
        const { genresSelected } = prevState;
        if (genresSelected.indexOf(checkBoxActive) === -1) {
          genresSelected.push(checkBoxActive);
          //console.log("genresSelected", genresSelected);
        } else {
          genresSelected.splice(genresSelected.indexOf(checkBoxActive), 1);
          //console.log("genresSelected ", genresSelected);
        }
      },
      () => this.filterByGenres()
    );
  }

  filterByGenres() {
    const { booksList, genresSelected } = this.state;
    let filteredBooks = [];
    console.log("booksList", booksList);
    if (genresSelected.length <= 0) {
      filteredBooks = booksList;
      return booksList;
    } else {
      for (const book of booksList) {
        const genres = book.genre;
        for (const genre of genres) {
          if (
            genresSelected.indexOf(genre) > -1 &&
            !(filteredBooks.indexOf(book) > -1)
          ) {
            filteredBooks.push(book);
          }
        }
      }
      console.log("filteredBooks", filteredBooks);
    }
    return filteredBooks;
  }

  handleTitle = e => {
    const title = e.currentTarget.value;
    this.setState({
      title: title
    });
  };

  handlePrize = e => {
    const prize = e.currentTarget.value;
    this.setState({
      prize: prize
    });
  };

  addNewBook = () => {
    const { title, prize } = this.state;
    const newBook = {
      id: "",
      title: title,
      genre: [],
      prize: prize
    };

    this.setState(prevState => {
      const nextState = [...prevState.booksList, newBook];
      return {
        booksList: nextState
      };
    });
    this.props.history.push("/");
  };

  componentDidMount() {
    this.getBooks();
    this.filterByGenres();
  }

  render() {
    const {
      booksList,
      groupedGenres,
      filteredBooksList,
      title,
      prize
    } = this.state;

    return (
      <div className="App">
        <Header />
        <Switch>
          <Route
            exact
            path="/"
            render={() => (
              <BooksList
                booksList={this.filterByGenres()}
                groupedGenres={groupedGenres}
                handleFilterGenres={this.handleFilterGenres}
              />
            )}
          />
          <Route
            path="/AddBook/"
            render={() => (
              <AddBook
                title={title}
                handleTitle={this.handleTitle}
                prize={prize}
                handlePrize={this.handlePrize}
                addNewBook={this.addNewBook}
              />
            )}
          />
          <Route path="/EditGenres/" render={() => <EditGenres />} />
        </Switch>
      </div>
    );
  }
}

export default withRouter(App);
