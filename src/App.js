import React from 'react'
// import * as BooksAPI from './BooksAPI'
import './App.css'
import { Route, Routes } from 'react-router-dom';
import BookList from './Components/BookList';
import BookSearch from './Components/BookSearch';
import Input from './Components/Input';


class BooksApp extends React.Component {
  state = {
  }

  render() {
    return (
      <div className="app">
        <Routes>
          <Route exact path='/' element={<BookList /> } />
          <Route path='/search' element={<BookSearch />} />
          <Route path='/test' element={<Input />} />
        </Routes>
      </div>
    )
  }
}

export default BooksApp
