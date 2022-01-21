import React, {Component} from 'react';
import {Link} from 'react-router-dom';

// import PropTypes from 'prop-types'

// static propTypes = {
//     contacts: PropTypes.array.isRequired,
//     onDeleteContact: PropTypes.func.isRequired,
//   }

class BookList extends Component {
    render(){
        return (
            <div>
                <p>BookList</p>
                <Link 
                to='/create'
                >create</Link>
            </div>
        )
    }
}





export default BookList
