import React, { Component } from 'react'
import PropTypes from 'prop-types'

class DisplayBook extends Component {
  render() {
    return (
      <div className="book">
        <div className="book-top">
          <div className="book-cover" style={this.props.style}></div>
          <div className="book-shelf-changer">
            <select>
              <option value="none" disabled>Move to...</option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              <option value="none">None</option>
            </select>
          </div>
        </div>
        <div className="book-title">{this.props.Book.title}</div>
        {this.props.Book.authors.map(author => <div className="book-authors">{author}</div>)}
      </div>
    )
  }
}

DisplayBook.protoTypes = {
  Book: PropTypes.object.isRequired
}

export default DisplayBook