import React, { Component } from 'react';
import './App.css';
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
      booksList: []
    }
  }

  getBooks() {
    fetchBooks()
      .then(data => {
        this.setState({
          booksList: data
        });
      })
  }

  componentDidMount() {
    this.getBooks();
  }

  render() {
    const {booksList} = this.state;
    
    return (
      <div className="App">
        <Header />
        <Switch>
          <Route exact path="/" render={()=>
            <BooksList booksList={booksList} />
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
