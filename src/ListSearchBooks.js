import React, { Component } from 'react'
import PropTypes from 'prop-types'

class ListSearchBooks extends Component {
    state = {
        query: ''
    }

    updateQuery = (query) => {
        this.setState({ query: query.trim() })
    }

    render() {
        return (
            <div className="list-SearchBooks">
            </div>
        )
    }
}

ListSearchBooks.protoTypes = {
}

export default ListSearchBooks