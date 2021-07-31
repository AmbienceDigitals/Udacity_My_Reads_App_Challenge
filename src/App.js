import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import {Link} from 'react-router-dom';
import CurrentlyReading from './Reading';
import Read from './Read';
import WantToRead from './WantTo';
import SearchBooks from './Search'
import './App.css'

import * as BooksAPI from './Api/BooksAPI';

class BooksApp extends Component {
  state = {
    books: [],
    read: [],
    wantToRead: [],
    searchResults: [],
  };

// fetching data from an api using componentDidMount

componentDidMount() {
    this.fetchAllBooks();
}

// function to fetch All Books
fetchAllBooks=()=>{
  console.log("Ambience BooksApp fetchAllBooks called " )
  BooksAPI.getAll().then((books) => {
      this.setState({ 
        books: books,
        searchResults: this.state.searchResults
      })
  })
}

  // function to update shelf
  updateBook=(book,shelf)=> {
		
		console.log("Ambience updateBook : "  + book.title + "  " + shelf)
		BooksAPI.update(book, shelf).then(()=>{
      if(shelf === 'read') {
        this.setState( {
          books: this.state.books,
          reads: this.state.read.push(book)
        });
      }
      else if(shelf === 'wantToRead') {
        this.setState( {
          books: this.state.books,
          wantToReads: this.state.wantToRead.push(book)
        });
        console.log({shelf})
      }
	})
}

  render() {
    // let showingBooks;
    return (
      <div className="app">
        {/* Using routes to navigate different url using component */}
        <Route exact path="/" render={() =>{
          return(
            <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                <CurrentlyReading
                books={this.state.books}
                updateBook={this.updateBook}>
                </CurrentlyReading>
                <WantToRead
                wantToRead={this.state.wantToRead}
                updateBook={this.updateBook}>
                </WantToRead>
                <Read
                read={this.state.read}
                updateBook={this.updateBook}>
                </Read>
              </div>
            </div>
            <div className="open-search">
              <Link to='/search'>
                <button>
                Add A Book
                </button>
              </Link>
          </div>
          </div>
          )}}></Route>

        <Route exact path="/search" render={({history}) =>{
            return(
              <SearchBooks></SearchBooks>
          )}}></Route>

        
      </div>
    )
  }
}

export default BooksApp
