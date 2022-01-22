import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Book from './Book';
import * as API from '../BooksAPI';


// import PropTypes from 'prop-types'

// static propTypes = {
//     contacts: PropTypes.array.isRequired,
//     onDeleteContact: PropTypes.func.isRequired,
//   }
/*
2 things for 7naka
make the shelves as component 
make the book accept the book as it comes from the api
*/
class BookList extends Component {
    state = {
        booksArr: []
    }


    BooksQuery = () => {
        API.getAll()
            .then((booksRes) => {
                let booksFormated = []
                for (const ele of booksRes) {
                    // console.log(ele.id)
                    booksFormated.push({
                        id: ele.id,
                        name: ele.title,
                        author: ele.authors[0],
                        pic: 'url("' + ele.imageLinks.thumbnail + '")',
                        status: ele.shelf
                    })
                }
                this.setState((oldState) => (
                    oldState.booksArr = booksFormated
                ))
            })
    }

    componentDidMount() {
        this.BooksQuery();
    }


    BookUpdate = (bookid, newstatus) => {
        let selectedIndex = (ele) => ele.id === bookid
        let index = this.state.booksArr.findIndex(selectedIndex)
        let changedBook = this.state.booksArr[index]
        changedBook.status = newstatus
        let allBooks = this.state.booksArr
        allBooks[index] = changedBook
        API.update(this.state.booksArr[index], newstatus)
            .then(() => {
                this.setState({ allBooks })
            })

    }
    render() {
        return (
            <div>  <div className="list-books">
                <div className="list-books-title">
                    <h1>MyReads</h1>
                </div>
                <div className="list-books-content">
                    <div>
                        <div className="bookshelf">
                            <h2 className="bookshelf-title">currentlyReading</h2>
                            <div className="bookshelf-books">
                                <ol className="books-grid">
                                    {
                                        this.state.booksArr.filter((book, index) => book.status === 'currentlyReading').map((book, index) => (
                                            <li key={index}><Book bookElement={book} update={this.BookUpdate} /></li>
                                        ))
                                    }
                                </ol>
                            </div>
                        </div>
                        <div className="bookshelf">
                            <h2 className="bookshelf-title">Want to Read</h2>
                            <div className="bookshelf-books">
                                <ol className="books-grid">
                                    {
                                        this.state.booksArr.filter((book, index) => book.status === 'wantToRead').map((book, index) => (
                                            <li key={index}><Book bookElement={book} update={this.BookUpdate} /></li>
                                        ))
                                    }
                                </ol>
                            </div>
                        </div>
                        <div className="bookshelf">
                            <h2 className="bookshelf-title">Read</h2>
                            <div className="bookshelf-books">
                                <ol className="books-grid">
                                    {
                                        this.state.booksArr.filter((book, index) => book.status === 'read').map((book, index) => (
                                            <li key={index}><Book bookElement={book} update={this.BookUpdate} /></li>
                                        ))
                                    }
                                </ol>
                            </div>
                        </div>
                    </div>
                </div>
                <Link to='/search' className='open-search2'>Add a book</Link>
            </div>

            </div>
        )
    }
}





export default BookList
