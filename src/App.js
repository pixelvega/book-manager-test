import React, { Component } from 'react';
import './App.scss';
import {Switch, Route} from 'react-router-dom';
import Header from './components/Header';
import BooksList from './components/BooksList';
import AddBook from './components/AddBook';
import EditGenres from './components/EditGenres';
import {fetchBooks} from './services/booksService';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      booksList: [],
      groupedGenres: []
    }
  }

  getBooks() {
    fetchBooks()
      .then(data => {
        this.setState({
          booksList: data
        });
      this.getGenres(this.state.booksList);
      });
  }

  getGenres(booksList) {
    const genres = booksList.map((book)=>{
      return book.genre;
    });
    let groupedGenres = [];
    for (let i=0; i<genres.length; i++) {
      let arrGenres = genres[i];
      for(let j=0; j<arrGenres.length; j++) {
        let genre = arrGenres[j];
        groupedGenres.push(genre);
      }
    }
    console.log(groupedGenres);
    this.setState({
      groupedGenres: groupedGenres
    })
  }

  componentDidMount() {
    this.getBooks();
  }

  render() {
    const {booksList, groupedGenres} = this.state;

    return (
      <div className="App">
        <Header />
        <Switch>
          <Route exact path="/" render={()=>
            <BooksList booksList={booksList} groupedGenres={groupedGenres} />
          }/>
          <Route path="/AddBook/" render={()=>
            <AddBook />
          } />
          <Route path="/EditGenres/" render={()=>
            <EditGenres />
          } />
        </Switch>
      </div>
    );
  }
}

export default App;
