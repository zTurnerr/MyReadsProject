import React from 'react'
// import * as BooksAPI from './BooksAPI'
import './App.css'
import { Route, Routes } from 'react-router-dom';
import BookList from './Components/BookList';
import BookCreate from './Components/BookCreate';


class BooksApp extends React.Component {
  state = {
  }

  render() {
    return (
      <div className="app">
        <Routes>
          <Route exact path='/' element={<BookList /> } />
          <Route path='/create' element={<BookCreate />} />
        </Routes>
      </div>
    )
  }
}

export default BooksApp
