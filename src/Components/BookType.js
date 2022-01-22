import React, { Component } from 'react'
import PropTypes from 'prop-types';


class BookType extends Component {
    state = {
        booksTypes: ['read', 'wantToRead', 'currentlyReading', 'None'],
        status: ''
    }
    statusChange = (event)=>{
        this.props.updateStatus(event.target.value)
    }
    render() {
        return (
            <div className="book-shelf-changer">
                <select defaultValue={this.props.bookState} onChange={this.statusChange}>
                <option value="move" disabled>Move to...</option>
                    {
                        this.state.booksTypes.map((state, index)=>(
                            <option value={state} key={index} >{state}</option>

                        ))
                    }
                </select>
            </div>
        )
    }
}

BookType.propTypes = {
    updateStatus: PropTypes.func,
    bookState: PropTypes.string,
}




export default BookType
