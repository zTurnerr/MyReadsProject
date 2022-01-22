import React, { Component } from 'react'
import * as API from '../BooksAPI';
import Book from './Book';
import Input from './Input';

class BookSearch extends Component {
    state = {
        searchInput: '',
        searchBooksArr: [],
        booksArr: []
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

    handleChangeSearchKey = (query) => {
        if (query !== '') {
            API.search(query)
                .then((searchRes) => {
                    let booksFormated = []
                    for (const ele of searchRes) {
                            let tempStatus = 'None'
                            let matchRes = this.state.booksArr.filter((main) => main.id === ele.id)
                            if (matchRes.length >= 1) tempStatus = matchRes[0].shelf
                            try{booksFormated.push({
                                id: ele.id,
                                name: ele.title,
                                author: ele.authors[0],
                                pic: 'url("' + ele.imageLinks.thumbnail + '")',
                                status: tempStatus
                            })}
                            catch(e){
                                console.log('no url found')
                            }
                        }
                    this.setState((oldState) => (
                        oldState.searchBooksArr = booksFormated
                    ))

                }).catch((err) => {
                    this.setState((oldState) => (
                        oldState.searchBooksArr = []
                    ))
                })
        } else {
            this.setState((oldState) => (
                oldState.searchBooksArr = []
            ))
        }

    }

    BookUpdate = (bookid, newstatus) => {
        let selectedIndex = (ele) => ele.id === bookid
        let index = this.state.searchBooksArr.findIndex(selectedIndex)
        let changedBook = this.state.searchBooksArr[index]
        changedBook.status = newstatus
        let allBooks = this.state.searchBooksArr
        allBooks[index] = changedBook
        API.update(this.state.searchBooksArr[index], newstatus)
            .then(() => {
                this.setState((oldState) =>(
                    oldState.searchBooksArr = allBooks
                ))
            })
    }

    render() {
        return (
            <div className="search-books">
                <Input searching={this.handleChangeSearchKey} />
                <div className="search-books-results">
                    <ol className="books-grid">
                        {
                            this.state.searchBooksArr.map((book, index) => (
                                <li key={index}><Book bookElement={book} update={this.BookUpdate} /></li>
                            ))
                        }
                    </ol>
                </div>
            </div>

        )
    }
}





export default BookSearch
