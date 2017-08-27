import React, { Component } from 'react'
import Book from './Book'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

class SearchBooks extends Component {
    state = {
        query: ''
    }

    updateQuery = (query) => {
        this.setState({ query: query.trim() })
        this.props.onUpdateQuery(query)
    }

    moveBook = (id, target) => { this.props.onMoveBook(id, target) }

    render() {
        return (
            <div className="search-books">

                <div className="list-searchbooks">
                    <div className="search-books-bar">
                        <Link to="/" className="close-search" >Close</Link>
                        <div className="search-books-input-wrapper">
                            <input
                                className='search-books'
                                type="text"
                                placeholder="Search by title or author"
                                value={this.state.query}
                                onChange={(event) => this.updateQuery(event.target.value)}
                            />
                        </div>
                    </div>
                    <div className="search-books-results">
                        <ol className="books-grid">
                            {(this.props.searchBooks && this.props.searchBooks.length > 0) && this.props.searchBooks.map(book => (
                                <li key={book.id}>
                                    <Book book={book}
                                        style={{ width: 128, height: 193, backgroundImage: book.hasOwnProperty("imageLinks") ? 'url(' + book.imageLinks.thumbnail + ')' : '' }}
                                        onChange={(id, target) => this.moveBook(id, target)} />
                                </li>
                            ))}
                        </ol>
                    </div>
                </div>
            </div>
        )
    }
}

SearchBooks.protoTypes = {
}

export default SearchBooks