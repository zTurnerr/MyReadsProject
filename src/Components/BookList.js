import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Book from './Book';
import * as API from '../BooksAPI';


class BookList extends Component {
    state = {
        booksArr: [],
        shelvesArr: [{
            title: 'Currently Reading',
            key: 'currentlyReading'}
        ,{
            title: 'Want to Read',
            key: 'wantToRead'}
        ,{
            title: 'Read',
            key: 'read'
        }]
    }


    BooksQuery = () => {
        API.getAll()
            .then((booksRes) => {
                let booksFormated = []
                for (const ele of booksRes) {
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
                        {
                            this.state.shelvesArr.map((shelf) => (
                                <div key={shelf.key} className="bookshelf">
                                    <h2 className="bookshelf-title">{shelf.title}</h2>
                                    <div className="bookshelf-books">
                                        <ol className="books-grid">
                                            {
                                                this.state.booksArr.filter((book, index) => book.status === shelf.key).map((book, index) => (
                                                    <li key={index}><Book bookElement={book} update={this.BookUpdate} /></li>
                                                ))
                                            }
                                        </ol>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
                <Link to='/search' className='open-search2'>Add a book</Link>
            </div>

            </div>
        )
    }
}





export default BookList
