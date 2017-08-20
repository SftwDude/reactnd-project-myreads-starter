import React, { Component } from 'react'
import PropTypes from 'prop-types'

class DisplayBook extends Component {
  state = {book:{},status:"none"}
  
  onBookChange =(event) =>
  {
this.props.onChange(event.target.name,event.target.value)
  }

  render() {
    return (
      <div className="book">
        <div className="book-top">
          <div className="book-cover" style={this.props.style}></div>
          <div className="book-shelf-changer">
            <select name={this.props.Book.title} onChange={this.onBookChange}>
              <option value="none" >Move to...</option>
              <option value={"wantToRead"}>Want to Read</option>
              <option value={"currentlyReading"}>Currently Reading</option>
              <option value={"read"}>Read</option>
              <option value={"none"}>None</option>
            </select>
          </div>
        </div>
        <div className="book-title">{this.props.Book.title}</div>
        {this.props.Book.authors && this.props.Book.authors.map(author => <div key = {author} className="book-authors">{author}</div>)}
      </div>
    )
  }
}

DisplayBook.protoTypes = {
  Book: PropTypes.object.isRequired
}

export default DisplayBook