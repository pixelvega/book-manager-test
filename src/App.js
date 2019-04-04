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
      filteredBooks: [],
      booksList: [],
      groupedGenres: [],
      genresSelected: [],
      title: "",
      prize: "",
      index: "",
      genres: [],
      newGenre: "",
      actualBook: {
        genres: []
      }
    };
    this.handleFilterGenres = this.handleFilterGenres.bind(this);
    this.filterByGenres = this.filterByGenres.bind(this);
  }

  getBooks() {
    fetchBooks().then(data => {
      this.setState({
        booksList: data,
        filteredBooks: data
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
    if (genresSelected.length <= 0) {
      filteredBooks = booksList;
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
    }
    this.setState({
      filteredBooks: filteredBooks
    });
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

  handleNewGenre = e => {
    const addedGenre = e.currentTarget.value;
    this.setState({
      newGenre: addedGenre
    });
  };

  saveGenre = () => {
    const { newGenre } = this.state;
    const { genres } = this.state;

    if (genres.includes(newGenre)) {
      alert("este género ya existe");
      this.setState({
        newGenre: ""
      });
    } else {
      this.setState(prevState => {
        const nextStateGenres = [...prevState.genres, newGenre];
        const nextStateGroupedGenres = [...prevState.groupedGenres, newGenre];
        return {
          genres: nextStateGenres,
          newGenre: "",
          groupedGenres: nextStateGroupedGenres
        };
      });
    }
  };

  saveBook = index => {
    const { booksList, title, prize, genres, pathname } = this.state;
    const newBook = {
      id: index,
      title: title,
      genre: genres,
      prize: prize
    };
    const books = booksList;

    if (pathname === "/EditBook/") {
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
          booksList: nextState,
          filteredBooks: nextState
        };
      });
    }
    this.props.history.push("/");
  };

  clearForm = () => {
    let newID = this.generateNewId();
    this.setState({
      title: "",
      prize: "",
      index: newID,
      genres: []
    });
  };

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

  discardChanges = () => {
    const { pathname, actualBook, booksList } = this.state;
    let userConfirm = true;
    if (pathname === "/AddBook/" || pathname === "/EditBook/") {
      userConfirm = window.confirm(
        "Are you sure you want to discard the changes?"
      );
    }

    if (userConfirm) {
      this.setState(
        () => {
          return {
            title: actualBook.title,
            prize: actualBook.prize,
            index: actualBook.index,
            genres: actualBook.genres
          };
        },
        () => {
          return this.props.history.push("/");
        }
      );
    }
  };

  searchId(booksList, index) {
    let id = booksList.findIndex(book => book.id === index);
    return id;
  }

  deleteBook = (index, title) => {
    const userConfirm = window.confirm(
      `The book "${title}" will be deleted. Do you want to continue?`
    );
    if (userConfirm) {
      const { booksList } = this.state;
      const id = this.searchId(booksList, index);
      const updatedBooks = booksList;
      updatedBooks.splice(parseInt(id), 1);

      this.setState(
        {
          booksList: updatedBooks
        },
        this.getGenres(updatedBooks)
      );
    }
  };

  updateBook = (title, prize, id, genres) => {
    const actualBook = {
      title: title,
      prize: prize,
      index: id,
      genres: [...genres]
    };
    this.setState({
      title: title,
      prize: prize,
      index: id,
      genres: [...genres],
      actualBook: actualBook
    });

    this.props.history.push("/EditBook/");
  };

  handleAddGenres = e => {
    const genre = e.currentTarget.value;
    const { booksList } = this.state;
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
    const { pathname } = this.state;
    if (pathname === "/AddBook/" || pathname === "/EditBook/") {
      this.discardChanges();
    }
  };

  componentDidMount() {
    this.getBooks();
    this.filterByGenres();
  }

  savePathname(prevProps) {
    const actualPathname = this.props.location.pathname;
    const previousPathname = prevProps.location.pathname;
    if (actualPathname !== previousPathname) {
      console.log("Route change to: ", this.props.location.pathname);
      this.setState({
        pathname: actualPathname
      });
    }
  }

  componentDidUpdate(prevProps) {
    this.savePathname(prevProps);
  }

  render() {
    const {
      groupedGenres,
      title,
      prize,
      index,
      genres,
      newGenre,
      filteredBooks
    } = this.state;

    return (
      <div className="App">
        <Header checkView={this.checkView} clearForm={this.clearForm} />
        <Switch>
          <Route
            exact
            path="/"
            render={() => (
              <BooksList
                booksList={filteredBooks}
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
                discardChanges={this.discardChanges}
                groupedGenres={groupedGenres}
                handleNewGenre={this.handleNewGenre}
                newGenre={newGenre}
                handleAddGenres={this.handleAddGenres}
                saveGenre={this.saveGenre}
              />
            )}
          />
          <Route
            path="/EditBook/"
            render={() => (
              <AddBook
                title={title}
                handleTitle={this.handleTitle}
                prize={prize}
                handlePrize={this.handlePrize}
                saveBook={this.saveBook}
                index={index}
                genres={genres}
                discardChanges={this.discardChanges}
                groupedGenres={groupedGenres}
                handleNewGenre={this.handleNewGenre}
                newGenre={newGenre}
                handleAddGenres={this.handleAddGenres}
                saveGenre={this.saveGenre}
              />
            )}
          />
          <Route path="/EditGenres/" render={() => <EditGenres />} />
        </Switch>
      </div>
    );
  }
}

export default withRouter(props => <App {...props} />);
