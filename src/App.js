import React from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import './App.css'
import BookShelf from './BookShelf'
import SearchBooks from './SearchBooks'

class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    showSearchPage: false,

    currentlyReadingBooks: [],
    wantToReadBooks: [],
    readBooks: [],
    searchBooks: [],

    query: ''
  }

  updateSearchPageFlag = (value) => this.setState({ showSearchPage: value })

  updateQuery = (query) => {
    BooksAPI.search(query, 20).then((books) => {
      this.setState({ searchBooks: books })
    })
    this.setState({ query: query.trim() })
  }

  assignBook(book, targetCatagory = "none") {
    BooksAPI.update(book, targetCatagory)
    if (targetCatagory === "currentlyReading") {
      this.state.currentlyReadingBooks.push(book)
      this.setState({ currentlyReadingBooks: this.state.currentlyReadingBooks })
    }
    else if (targetCatagory === "wantToRead") {
      this.state.wantToReadBooks.push(book)
      this.setState({ wantToReadBooks: this.state.wantToReadBooks })
    }
    else if (targetCatagory === "read") {
      this.state.readBooks.push(book)
      this.setState({ readBooks: this.state.readBooks })
    }
  }

  moveBook = (id, targetCatagory) => {
    /* Search for the book in the shelves, if found then remove it from the shelf */
    /* and assign it to a new shelf.                                              */
    let idx

    idx = this.state.currentlyReadingBooks.findIndex(b => b.id === id)
    if ((idx >= 0) && (targetCatagory !== "currentlyReading")) {
      this.assignBook(this.state.currentlyReadingBooks[idx], targetCatagory)
      this.setState({ currentlyReadingBooks: this.state.currentlyReadingBooks.filter(b => b.id !== id) })
    }
    else {

      idx = this.state.wantToReadBooks.findIndex(b => b.id === id)
      if ((idx >= 0) && (targetCatagory !== "wantToRead")) {
        this.assignBook(this.state.wantToReadBooks[idx], targetCatagory)
        this.setState({ wantToReadBooks: this.state.wantToReadBooks.filter(b => b.id !== id) })
      }
      else {

        idx = this.state.readBooks.findIndex(b => b.id === id)
        if ((idx >= 0) && (targetCatagory !== "read")) {
          this.assignBook(this.state.readBooks[idx], targetCatagory)
          this.setState({ readBooks: this.state.readBooks.filter(b => b.id !== id) })
        }
        else {

          if (idx < 0) { //The book is from search and needs to be assinged to a shelf
            BooksAPI.get(id).then(book => this.assignBook(book, targetCatagory))
          }
        }
      }
    }
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({
        currentlyReadingBooks: books.filter(b => b.shelf === "currentlyReading"),
        wantToReadBooks: books.filter(b => b.shelf === "wantToRead"),
        readBooks: books.filter(b => b.shelf === "read")
      })

    })
  }

  render() {
    return (
      <div className="app">
        {this.state.showSearchPage ? (
          <div className="search-books">
            <SearchBooks searchBooks={this.state.searchBooks}
              onUpdateQuery={(query) => this.updateQuery(query)}
              onUpdateSearchPageFlag={(state) => this.updateSearchPageFlag(state)}
              onMoveBook={(id, target) => this.moveBook(id, target)} />
          </div>
        ) : (
            <div className="list-books">
              <div className="list-books-title">
                <h1>MyReads</h1>
              </div>
              <div className="list-books-content">
                <div>
                  <BookShelf title={"Currently Reading"}
                    books={this.state.currentlyReadingBooks}
                    onMoveBook={(id, target) => this.moveBook(id, target)} />
                  <BookShelf title={"Want to Read"}
                    books={this.state.wantToReadBooks}
                    onMoveBook={(id, target) => this.moveBook(id, target)} />
                  <BookShelf title={"Read"}
                    books={this.state.readBooks}
                    onMoveBook={(id, target) => this.moveBook(id, target)} />
                </div>
              </div>
              <div className="open-search">
                <a onClick={() => this.updateSearchPageFlag(true)}>Add a book</a>
              </div>
            </div>
          )}
      </div>
    )
  }
}

export default BooksApp
