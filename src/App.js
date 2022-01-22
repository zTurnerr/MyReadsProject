import React from 'react'
// import * as BooksAPI from './BooksAPI'
import './App.css'
import { Route, Routes } from 'react-router-dom';
import BookList from './Components/BookList';
import BookSearch from './Components/BookSearch';


class BooksApp extends React.Component {
  state = {
  }

  render() {
    return (
      <div className="app">
        <Routes>
          <Route exact path='/' element={<BookList /> } />
          <Route path='/create' element={<BookSearch />} />
        </Routes>
      </div>
    )
  }
}

export default BooksApp
