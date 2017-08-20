import React from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import './App.css'
import BookShelf from './BookShelf'
import DisplayBook from './DisplayBook'
import ListSearchBooks from './ListSearchBooks'

class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    showSearchPage: false,

    books: [],
    currentlyReadingBooks: [],
    wantToReadBooks: [],
    readBooks: [],
    searchBooks: [],

    query: ''
  }

  updateQuery = (query) => {
    BooksAPI.search(query, 20).then((books) => {
      this.setState({ searchBooks: books })
    })
    this.setState({ query: query.trim() })
  }

  moveBook = (title, action) => {
    let foundBook, idx
    if ((idx = this.state.currentlyReadingBooks.findIndex(b => b.title === title)) >= 0) {
      foundBook = this.state.currentlyReadingBooks[idx]
      this.setState({ currentlyReadingBooks: this.state.currentlyReadingBooks.filter(b => b.title !== title) })
    } 
    else if ((idx = this.state.wantToReadBooks.findIndex(b => b.title === title)) >= 0) {
      foundBook = this.state.wantToReadBooks[idx]
      this.setState({ wantToReadBooks: this.state.wantToReadBooks.filter(b => b.title !== title) })
    }
    else if ((idx = this.state.readBooks.findIndex(b => b.title === title)) >= 0) {
      foundBook = this.state.readBooks[idx]
      this.setState({ readBooks: this.state.readBooks.filter(b => b.title !== title) })
    }

    if (foundBook) {
      if (action === "currentlyReading") {
        this.state.currentlyReadingBooks.push(foundBook)
        this.setState({ currentlyReadingBooks: this.state.currentlyReadingBooks })
      }
      else if (action === "wantToRead") {
        this.state.wantToReadBooks.push(foundBook)
        this.setState({ wantToReadBooks: this.state.wantToReadBooks })
      }
      else if (action === "read") {
        this.state.readBooks.push(foundBook)
        this.setState({ readBooks: this.state.readBooks })
      }
    }
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({
        books: books,
        currentlyReadingBooks: books.filter(b => b.shelf === "currentlyReading"),
        wantToReadBooks: books.filter(b => b.shelf === "wantToRead"),
        readBooks: books.filter(b => b.shelf === "read")
      })

    })
  }

  render() {
    /*Don't render anything if we haven't retreived any books */
    if (this.state.books.length === 0) { return (null) }
    return (
      <div className="app">
        {this.state.showSearchPage ? (
          <div className="search-books">
            <div className="search-books-bar">
              <a className="close-search" onClick={() => this.setState({ showSearchPage: false })}>Close</a>
              <div className="search-books-input-wrapper">
                {/* 
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md
                  
                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
                <input
                  className='search-books'
                  type="text"
                  placeholder="Search by title or author"
                  value={this.state.query}
                  onChange={(event) => this.updateQuery(event.target.name, event.target.value)}
                />

              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid">
                {this.state.searchBooks && this.state.searchBooks.map(book => (
                  <li key={book.id}>
                    <DisplayBook Book={book}
                      style={{ width: 128, height: 193, backgroundImage: book.hasOwnProperty("imageLinks") ? 'url(' + book.imageLinks.thumbnail + ')' : '' }}
                      onChange={(event) => this.moveBook(event.target.name, event.target.value)} />
                  </li>
                ))}
              </ol>
            </div>
          </div>
        ) : (
            <div className="list-books">
              <div className="list-books-title">
                <h1>MyReads</h1>
              </div>
              <div className="list-books-content">
                <div>
                  <div className="bookshelf">
                    <h2 className="bookshelf-title">Currently Reading</h2>
                    <div className="bookshelf-books">
                      <ol className="books-grid">
                        {this.state.currentlyReadingBooks.map(book => (
                          <li key={book.id}>
                            <DisplayBook Book={book}
                              style={{ width: 128, height: 193, backgroundImage: book.hasOwnProperty("imageLinks") ? 'url(' + book.imageLinks.thumbnail + ')' : '' }}
                              onChange={(name, value) => this.moveBook(name, value)} />
                          </li>
                        ))}
                      </ol>
                    </div>
                  </div>
                  <div className="bookshelf">
                    <h2 className="bookshelf-title">Want to Read</h2>
                    <div className="bookshelf-books">
                      <ol className="books-grid">
                        {this.state.wantToReadBooks.map(book => (
                          <li key={book.id}>
                            <DisplayBook Book={book}
                              style={{ width: 128, height: 193, backgroundImage: book.hasOwnProperty("imageLinks") ? 'url(' + book.imageLinks.thumbnail + ')' : '' }}
                              onChange={(name, value) => this.moveBook(name, value)} />
                          </li>
                        ))}
                      </ol>
                    </div>
                  </div>
                  <div className="bookshelf">
                    <h2 className="bookshelf-title">Read</h2>
                    <div className="bookshelf-books">
                      <ol className="books-grid">
                        {this.state.readBooks.map(book => (
                          <li key={book.id}>
                            <DisplayBook Book={book}
                              style={{ width: 128, height: 193, backgroundImage: book.hasOwnProperty("imageLinks") ? 'url(' + book.imageLinks.thumbnail + ')' : '' }}
                              onChange={(name, value) => this.moveBook(name, value)} />
                          </li>
                        ))}
                      </ol>
                    </div>
                  </div>
                </div>
              </div>
              <div className="open-search">
                <a onClick={() => this.setState({ showSearchPage: true })}>Add a book</a>
              </div>
            </div>
          )}
      </div>
    )
  }
}

export default BooksApp
