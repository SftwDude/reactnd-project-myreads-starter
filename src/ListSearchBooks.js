import React, { Component } from 'react'
import PropTypes from 'prop-types'

class ListSearchBooks extends Component {
    state = {
        query: ''
    }

    updateQuery = (query) => {
        this.setState({ query: query.trim() })
        this.props.onUpdateQuery(query)
    }

    updateSearchPageFlag = (state) => { this.props.onUpdateSearchPageFlag(state) }

    render() {
        return (
            <div className="list-SearchBooks">
                <div className="search-books-bar">
                    <a className="close-search" onClick={() => this.updateSearchPageFlag(false)}>Close</a>
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
            </div>
        )
    }
}

ListSearchBooks.protoTypes = {
}

export default ListSearchBooks