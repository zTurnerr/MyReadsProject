import React from 'react';
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types';






class Input extends React.Component {
    constructor(props) {
        super(props);
        this.changeName = this.changeName.bind(this);
    }

    state = {
        name: '',
        typing: false,
        typingTimeout: 0
    }

    sendToParent = () => {
        this.props.searching(this.state.name);
    }

    changeName = (event) => {
        const self = this;

        if (self.state.typingTimeout) {
            clearTimeout(self.state.typingTimeout);
        }

        self.setState({
            name: event.target.value,
            typing: false,
            typingTimeout: setTimeout(function () {
                self.sendToParent(self.state.name);
            }, 1000)
        });
    }

    render() {
        return (
                <div className="search-books-bar">
                    <Link className="close-search" to='/'>Close</Link>
                    <div className="search-books-input-wrapper">
                        <input type="text" placeholder='Enter name you wish to Search.' onChange={this.changeName} />

                    </div>
                </div>
        );
    }


}


Input.propTypes = {
    searching: PropTypes.func
}

export default Input











