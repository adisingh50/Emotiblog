import React, {Component} from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from 'axios';
import ".././styleSheets/CreatePost.css";
import ".././styleSheets/Post.css";
import Navbar from "./Navbar.js";
import Home from "./Home.js";
import ReactDOM from 'react-dom';

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

class CreatePost extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currImg: '',
            content: ''
        }

        this.imageSelector = this.imageSelector.bind(this);
        this.onChangeContent = this.onChangeContent.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    imageSelector(imgSelected) {
        this.setState({
            currImg: imgSelected
        });
    }

    onChangeContent(e) {
        this.setState({
            content: e.target.value
        });
    }

    onSubmit() {
        var x = document.getElementById('post-warning');
        if (this.state.currImg === '') {
            x.innerHTML = "Must Select an Emoji To Post With!"
        } else if (this.state.content === '') {
            x.innerHTML = "Must Type Something!"
        } else {
            const newPost = {
                userFirstName: this.props.userLoggedIn.firstName,
                userLastName: this.props.userLoggedIn.lastName,
                userEmail: this.props.userLoggedIn.email,
                emoji: this.state.currImg,
                content: this.state.content,
            }
    
            axios.post("http://localhost:5000/post/createPost", newPost)
                .then(response => console.log(response.data));
    
            this.setState({
                currImg: '',
                content: ''
            });
            ReactDOM.render(<Home userLoggedIn={this.props.userLoggedIn}/>, document.getElementById('root'));
        }
    }

    render() {
        const emojiName = this.state.currImg;
        return (
            <div className="container-home">
                    <h1><strong>EmotiBlog: Create Post</strong></h1>
                    <h3 className="home-welcome-msg"><strong>Share Your Thoughts, {this.props.userLoggedIn.firstName}!</strong></h3> 

                    <Navbar userLoggedIn={this.props.userLoggedIn}/>
                    <br></br>
                    <table className="table-posts">
                        <thead>
                            <tr>
                                <h4>Draft:</h4>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <div className="emoji-picker-header-box">
                                    <h5>How Are You Feeling? </h5>
                                </div>
                                <div className="emoji-picker-box">
                                    <ul>
                                        <li><img className="emoji-list-item"alt=""src={angryIMG} onClick={() => this.imageSelector('angry')}/></li>
                                        <li><img className="emoji-list-item"alt=""src={cryingIMG} onClick={() => this.imageSelector('crying')}/></li>
                                        <li><img className="emoji-list-item"alt=""src={happyIMG} onClick={() => this.imageSelector('happy')}/></li>
                                        <li><img className="emoji-list-item"alt=""src={heartsIMG} onClick={() => this.imageSelector('hearts')}/></li>
                                        <li><img className="emoji-list-item"alt=""src={neutralIMG} onClick={() => this.imageSelector('neutral')}/></li>
                                        <li><img className="emoji-list-item"alt=""src={partyIMG} onClick={() => this.imageSelector('party')}/></li>
                                        <li><img className="emoji-list-item"alt=""src={poopIMG} onClick={() => this.imageSelector('poop')}/></li>
                                        <li><img className="emoji-list-item"alt=""src={richIMG} onClick={() => this.imageSelector('rich')}/></li>
                                        <li><img className="emoji-list-item"alt=""src={sadIMG} onClick={() => this.imageSelector('sad')}/></li>
                                        <li><img className="emoji-list-item"alt=""src={sickIMG} onClick={() => this.imageSelector('sick')}/></li>
                                    </ul>
                                </div>
                            </tr>
                            <br></br>
                            <tr>
                                <div className="post-box">
                                    <div className="name-emoji-block">
                                        <h4><strong>{this.props.userLoggedIn.firstName} {this.props.userLoggedIn.lastName} feels...</strong></h4>
                                        <img src={emojiPaths[emojiName]} alt="" className="user_selected_img"></img>
                                    </div>
                                    <div className="content-block">
                                        <textarea id="text_area" 
                                                maxLength="250" 
                                                className="user-input-box"
                                                onChange={this.onChangeContent}></textarea>
                                    </div>
                                    
                                </div>
                                <p id="post-warning" className="post-warning"></p>
                                <div className="submit-box">
                                    <button className="create-post" onClick={this.onSubmit}><strong>Create Post</strong></button>
                                </div>
                            </tr>
                            <br></br>
                        </tbody>
                    </table>
            </div>
        );
    }
}

export default CreatePost;