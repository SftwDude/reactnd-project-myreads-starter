import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Book extends Component {
  onBookChange = (event) => {
    this.props.onChange(event.target.name, event.target.value)
  }

  render() {
    return (
      <div className="book">
        <div className="book-top">
          <div className="book-cover" style={this.props.style}></div>
          <div className="book-shelf-changer">
            <select name={this.props.book.id} onChange={this.onBookChange}>
              <option value="none" >Move to...</option>
              <option value={"wantToRead"}>Want to Read</option>
              <option value={"currentlyReading"}>Currently Reading</option>
              <option value={"read"}>Read</option>
              <option value={"none"}>None</option>
            </select>
          </div>
        </div>
        <div className="book-title">{this.props.book.title}</div>
        {this.props.book.authors && this.props.book.authors.map(author => <div key={author} className="book-authors">{author}</div>)}
      </div>
    )
  }
}

Book.protoTypes = {
  Book: PropTypes.array.isRequired
}

export default Book