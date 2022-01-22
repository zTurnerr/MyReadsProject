import React, { Component } from 'react'
import BookType from './BookType';


class Book extends Component {

    updateStatus = (newStatus) => {
        this.props.update(this.props.bookElement.name, newStatus)
    }
    render() {
        return (
            <div className="book">
                <div className="book-top">
                    <div className="book-cover" style={{ width: 128, height: 193, 
                        backgroundImage: this.props.bookElement.pic
                     }}></div>
                    <BookType bookState={this.props.bookElement.status} updateStatus={this.updateStatus}/>
                </div>
                <div className="book-title">{this.props.bookElement.name}</div>
                <div className="book-authors">{this.props.bookElement.author}</div>
            </div>
        )
    }
}





export default Book
