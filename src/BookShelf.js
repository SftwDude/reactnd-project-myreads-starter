import React, { Component } from 'react'
import Book from './Book'

class BookShelf extends Component {
    moveBook = (id, target) => { this.props.onMoveBook(id, target) }

    render() {
        return (
            <div className="bookshelf">
                <h2 className="bookshelf-title">{this.props.title}</h2>
                <div className="bookshelf-books">
                    <ol className="books-grid">
                        {this.props.books.map(book => (
                            <li key={book.id}>
                                <Book Book={book}
                                    style={{ width: 128, height: 193, backgroundImage: book.hasOwnProperty("imageLinks") ? 'url(' + book.imageLinks.thumbnail + ')' : '' }}
                                    onChange={(name, value) => this.moveBook(name, value)} />
                            </li>
                        ))}
                    </ol>
                </div>
            </div>
        )
    }
}

export default BookShelf