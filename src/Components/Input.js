import React from 'react';
import { Link } from 'react-router-dom'
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
export default Input













// import { useDebounce } from 'use-debounce';

// export default function Input() {
//     const [text, setText] = useState('Hello');
//     const [value] = useDebounce(text, 1000);

//     return (
//         <div className="search-books">
//             <div className="search-books-bar">
//                 <div className="search-books-input-wrapper">
//                     <input
//                         type="text"
//                         placeholder="Search by title or author"
//                         onChange={(e) => {
//                             setText(e.target.value);
//                         }}
//                     />
//                 </div>
//             </div>

//             <p>Actual value: {text}</p>
//             <p>Debounce value: {value}</p>
//         </div>
//     );
// }