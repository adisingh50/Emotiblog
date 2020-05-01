import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from 'axios';
import ".././styleSheets/Home.css"
import Post from "./Post";
import Navbar from "./Navbar.js";

import angryIMG from ".././images/angry.png";
import cryingIMG from ".././images/crying.png";
import happyIMG from ".././images/happy.png";
import heartsIMG from ".././images/hearts.png";
import neutralIMG from ".././images/neutral.png";
import partyIMG from ".././images/party.png";
import poopIMG from ".././images/poop.png";
import richIMG from ".././images/rich.png";
import sadIMG from ".././images/sad.png";
import sickIMG from ".././images/sick.png";
const emojiPaths = {
    angry: angryIMG,
    crying: cryingIMG,
    happy: happyIMG,
    hearts: heartsIMG,
    neutral: neutralIMG,
    party: partyIMG,
    poop: poopIMG,
    rich: richIMG,
    sad: sadIMG,
    sick: sickIMG
}

class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            posts:[],
            dict: {}
        }

        this.postList = this.postList.bind(this);
        this.barChartGen = this.barChartGen.bind(this);
    }

    componentDidMount() {
        axios.get("http://localhost:5000/post/viewAllPosts")
            .then(response => {
                this.setState({
                    posts: (response.data).reverse()
                });

                var newDict = {}
                response.data.forEach(post => {
                    if ((Date.now()) - (new Date(post.datePosted).getTime()) <= 86400000) {
                        if (post.emoji in newDict) {
                            newDict[post.emoji] += 1;
                        } else {
                            newDict[post.emoji] = 1;
                        }
                    }
                });
                
                this.setState({
                    dict: newDict
                });
            })
            .catch(err => console.log("Error: " + err));
    }

    postList() {
        return this.state.posts.map(currpost => {
            return <Post post={currpost} onUser={false}/>
        });
    }

    barChartGen() {
        var chartEmojis = [];
        chartEmojis.push(<h5>Recent Emojis (24 hrs): </h5>)
        for (var emoji in this.state.dict) {
            chartEmojis.push(<li><img alt=""className="list-emoji"src={emojiPaths[emoji]}></img></li>)
        }
        return chartEmojis;
    }

    render() {
        return(
            <div className="container-home">
                <div>
                    <div className="intro-stuff">
                        <h1><strong>EmotiBlog HomePage</strong></h1>
                        <h3 className="home-welcome-msg"><strong>Welcome Back, {this.props.userLoggedIn.firstName}!</strong></h3> 
                    </div>
                    <div className="bar-chart">
                        <ul className="emoji-list">
                            {this.barChartGen()}
                        </ul>
                    </div>
                </div>

                <Navbar userLoggedIn={this.props.userLoggedIn}/>
                <br></br>
                <table className="table-posts">
                    <thead>
                        <tr>
                            <h4>Your Feed:</h4>
                        </tr>
                    </thead>
                    <tbody>
                        {this.postList()}
                    </tbody>
                </table>
            </div>
        )
    }
    //replace Adi with {this.props.userLoggedIn.firstName}
}

export default Home;