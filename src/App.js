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
      prize: "",
      index: "",
      genres: [],
      update: false,
      addBook: false
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

  saveBook = index => {
    const { booksList, title, prize, genres, update } = this.state;
    const newBook = {
      id: index,
      title: title,
      genre: genres,
      prize: prize
    };
    const books = booksList;

    if (update) {
      for (let i = 0; i < books.length; i++) {
        if (books[i].id === index) {
          books[index] = newBook;
          break;
        }
      }
    } else {
      this.setState(prevState => {
        const nextState = [...prevState.booksList, newBook];
        return {
          booksList: nextState
        };
      });
    }
    this.setState({
      update: false,
      addBook: false
    });
    this.props.history.push("/");
  };

  resetForm = () => {
    const { update, addBook } = this.state;
    let userConfirm = true;
    let newID = this.generateNewId();
    if (update || addBook) {
      userConfirm = window.confirm(
        "Are you sure you want to discard the changes?"
      );
    }
    if (userConfirm) {
      if (addBook) {
        this.setState({
          title: "",
          prize: "",
          index: newID,
          genres: [],
          update: false,
          addBook: true
        });
      } else {
        this.setState({
          title: "",
          prize: "",
          index: "",
          genres: [],
          update: false,
          addBook: true
        });
      }
      this.props.history.push("/");
    }
  };

  searchId(booksList, index) {
    let id = booksList.findIndex(book => book.id === index);
    return id;
  }

  generateNewId = () => {
    const { booksList } = this.state;
    let newId = "0";
    const arrIds = booksList.map(book => {
      return book.id;
    });
    for (let i = 0; i <= arrIds.length; i++) {
      newId = i.toString();
      if (!arrIds.includes(newId)) {
        break;
      }
    }
    return newId;
  };

  deleteBook = (index, title) => {
    const userConfirm = window.confirm(
      `The book "${title}" will be deleted. Do you want to continue?`
    );
    if (userConfirm) {
      const { booksList } = this.state;
      const id = this.searchId(booksList, index);
      const updatedBooks = booksList;
      updatedBooks.splice(parseInt(id), 1);

      this.setState({
        booksList: updatedBooks
      });
    }
  };

  updateBook = (title, prize, id, genres) => {
    this.setState({
      title: title,
      prize: prize,
      index: id,
      genres: genres,
      update: true
    });

    this.props.history.push("/AddBook/");
  };

  handleAddGenres = e => {
    const genre = e.currentTarget.value;
    this.setState(prevState => {
      const { genres } = prevState;
      if (genres.indexOf(genre) === -1) {
        genres.push(genre);
        return true;
      } else {
        genres.splice(genres.indexOf(genre), 1);
        return false;
      }
    });
  };

  checkView = () => {
    const { addBook, update } = this.state;
    if (addBook || update) {
      this.resetForm();
    }
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
      prize,
      index,
      genres
    } = this.state;

    return (
      <div className="App">
        <Header checkView={this.checkView} />
        <Switch>
          <Route
            exact
            path="/"
            render={() => (
              <BooksList
                booksList={this.filterByGenres()}
                groupedGenres={groupedGenres}
                handleFilterGenres={this.handleFilterGenres}
                updateBook={this.updateBook}
                deleteBook={this.deleteBook}
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
                saveBook={this.saveBook}
                index={index}
                genres={genres}
                resetForm={this.resetForm}
                groupedGenres={groupedGenres}
                handleAddGenres={this.handleAddGenres}
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
