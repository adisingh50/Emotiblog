import React, { Component } from "react";
import axios from 'axios';
import ".././styleSheets/Post.css";
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


class Post extends Component {
    constructor(props) {
        super(props);

        this.pickImage = this.pickImage.bind(this);
        this.formatDate = this.formatDate.bind(this);
        this.convertToStandard = this.convertToStandard.bind(this);
        this.includeDeleteButton = this.includeDeleteButton.bind(this);
        this.deletePost = this.deletePost.bind(this);
    }

    pickImage() {
        switch(this.props.post.emoji) {
            case("angry"):
                return angryIMG;
            case("crying"):
                return cryingIMG;
            case("happy"):
                return happyIMG;
            case("hearts"):
                return heartsIMG;
            case("neutral"):
                return neutralIMG;
            case("party"):
                return partyIMG;
            case("poop"):
                return poopIMG;
            case("rich"):
                return richIMG;
            case("sad"):
                return sadIMG;
            case("sick"):
                return sickIMG;
            default:
                return poopIMG;
        }

    }

    formatDate(){
        var d = new Date(this.props.post.datePosted);
        var stringForm = d.toString();
        var dateFinal = stringForm.substring(0,15);
        var timeFinal = this.convertToStandard(stringForm.substring(16,21));
        return dateFinal + " @ " + timeFinal;
    }

    convertToStandard(milHour) {
        var hour = parseInt(milHour.substring(0,2));
        var AmPm = "AM";

        if (hour === 0) {
            hour += 12;
        } else if (hour === 12) {
            AmPm = "PM";
        } else if (hour > 12) {
            hour -= 12;
            AmPm = "PM";
        }
        return hour.toString() + ":" + milHour.substring(3,5) + AmPm;
    }

    includeDeleteButton() {
        if (this.props.onUser) {
            return <button className="delete-button" onClick={() => this.deletePost(this.props.post._id)}>Delete Post</button>
        }
    }

    deletePost(id) {
        axios.delete("http://localhost:5000/post/deletePost/" + id)
            .then(response => {
                console.log(response.data);
                ReactDOM.render(<Home userLoggedIn={this.props.userLoggedIn}/>, document.getElementById('root'));
            })
            .catch(err => console.log("Error: " + err));
    }

    render() {
        return (
            <tr>
                <div className="post-box">
                    <div className="time-block">
                        <p><strong>{this.formatDate()}</strong></p>
                    </div>
                    <div className="name-emoji-block">
                        <h5><strong>{this.props.post.userFirstName} {this.props.post.userLastName} feels...</strong></h5>
                        <img className="main-display-img" src={this.pickImage()} alt="emoji goes here"></img>
                    </div>
                    <div className="content-block">
                        <p>{this.props.post.content}</p>
                    </div>
                    {this.includeDeleteButton()}
                </div>
                <br></br>
            </tr>
        )
    }
}

export default Post;