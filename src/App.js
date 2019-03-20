import React, { Component } from 'react';
import './App.css';
import {Switch, Route} from 'react-router-dom';
import Header from './components/Header';
import BooksList from './components/BooksList';
import AddBook from './components/AddBook';
import EditGenres from './components/EditGenres';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <Switch>
          <Route exact path="/" render={()=>
            <BooksList />
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
