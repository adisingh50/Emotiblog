import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from 'axios';
import ".././styleSheets/Home.css"
import Post from "./Post";
import Navbar from "./Navbar.js";

class YourPosts extends Component {
    constructor(props) {
        super(props);

        this.state = {
            posts: []
        }
        this.postList = this.postList.bind(this);
    }

    componentDidMount() {
        axios.get("http://localhost:5000/post/viewYourPosts/" + this.props.userLoggedIn.email)
            .then(response => {
                this.setState({
                    posts: (response.data).reverse()
                });
            })
            .catch(err => console.log("Error: " + err));
    }    

    postList() {
        return this.state.posts.map(currpost => {
            return <Post post={currpost} onUser={true} userLoggedIn={this.props.userLoggedIn}/>
        });
    }

    render() {
        return(
            <div className="container-home">
                <h1><strong>EmotiBlog: Your Posts</strong></h1>
                <h3 className="home-welcome-msg"><strong>Welcome Back, {this.props.userLoggedIn.firstName}!</strong></h3> 

                <Navbar userLoggedIn={this.props.userLoggedIn}/>
                <br></br>
                <table className="table-posts">
                    <thead>
                        <tr>
                            <h4>Your Posts:</h4>
                        </tr>
                    </thead>
                    <tbody>
                        {this.postList()}
                    </tbody>
                </table>
            </div>          
        )
    }
}

export default YourPosts;