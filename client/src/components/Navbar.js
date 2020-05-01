import React, {Component} from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import ".././styleSheets/Navbar.css";
import ReactDOM from 'react-dom';
import YourPosts from "./YourPosts.js";
import Home from './Home.js';
import CreatePost from './CreatePost.js';
import Messaging from './Messaging.js';

class Navbar extends Component {
    constructor(props) {
        super(props);

        this.allPostsNavigation = this.allPostsNavigation.bind(this);
        this.yourPostsNavigation = this.yourPostsNavigation.bind(this);
        this.createPostsNavigation = this.createPostsNavigation.bind(this);
        this.messageNavigation = this.messageNavigation.bind(this);
    }

    allPostsNavigation() {
        ReactDOM.render(<Home userLoggedIn={this.props.userLoggedIn}/>, document.getElementById('root'));
    }

    yourPostsNavigation() {
        ReactDOM.render(<YourPosts userLoggedIn={this.props.userLoggedIn}/>, document.getElementById('root'));
    }

    createPostsNavigation() {
        ReactDOM.render(<CreatePost userLoggedIn={this.props.userLoggedIn}/>, document.getElementById('root'));
    }

    messageNavigation() {
        ReactDOM.render(<Messaging userLoggedIn={this.props.userLoggedIn}/>, document.getElementById('root'));
    }

    render() {
        return (
            <ul className="nav-tab">
                <li><button className="link" onClick={this.allPostsNavigation}><strong>All Posts</strong></button></li>
                <li><button className="link" onClick={this.yourPostsNavigation}><strong>Your Posts</strong></button></li>
                <li><button className="link" onClick={this.createPostsNavigation}><strong>Create Post</strong></button></li>
                <li><button className="link" onClick={this.messageNavigation}><strong>Messaging</strong></button></li>
            </ul>
        )
    }
}

export default Navbar;