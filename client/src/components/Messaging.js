import React, {Component} from 'react';
import axios from 'axios';
import ".././styleSheets/Messaging.css";
import Navbar from "./Navbar.js";
import "bootstrap/dist/css/bootstrap.min.css";

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

class Messaging extends Component {
    constructor(props) {
        super(props);

        this.state = {
            areaCode: '',
            mainNumber: '',
            body: '',
            emoji: ''
        }

        this.imageSelector = this.imageSelector.bind(this);
        this.sendMessage = this.sendMessage.bind(this);
        this.isInputNumber = this.isInputNumber.bind(this);
    }

    isInputNumber(e, area) {
        var char = String.fromCharCode(e.which);
        if (area) {
            if (!(/[0-9]/.test(char))) {
                if (!(/[+]/.test(char))) {
                    e.preventDefault();
                }
            }
        } else {
            if (!(/[0-9]/.test(char))) {
                e.preventDefault();
            }
        }
    }

    imageSelector(imgSelected) {
        if (this.state.emoji) {
            var prevImgID = document.getElementById(this.state.emoji);
            prevImgID.style.cssText = "";
        }
    
        this.setState({
            emoji: imgSelected
        });

        var imgID = document.getElementById(imgSelected);
        imgID.style.cssText = "border: 1px solid black";
    }

    sendMessage(e) {
        e.preventDefault();
        console.log(this.state.phoneNumber, this.state.body);
        var x = document.getElementById('post-warning');
        console.log(Date.now());

        if (this.state.areaCode === "") {
            x.innerHTML = 'Must Enter an Area Code';
        } else if (this.state.emoji === "") {
            x.innerHTML = 'Must Select an Emoji to Send!';
        } else if (this.state.body === "") {
            x.innerHTML = 'Must write something in the message box';
        } else if (this.state.mainNumber === "") {
            x.innerHTML = 'Must enter a phone number'
        } else if (this.state.mainNumber.length < 10) {
            x.innerHTML = "Phone Number must be at least length 10."
        } else {
            x.innerHTML = 'Message Sent';
            var phoneNumber = this.state.areaCode + this.state.mainNumber;

            const newMessage = {
                body: this.state.body,
                from: '+19384441611',
                to: phoneNumber,
                emoji: this.state.emoji 
            }
            axios.post("http://localhost:5000/messages/", newMessage)
                .then(response => console.log(response.data));
            
            this.setState({
                areaCode: '',
                mainNumber: '',
                body: '',
                emoji: ''
            });
        }
    }

    render() {
        return (
            <div className="container-home">
                <h1><strong>EmotiBlog: Create Post</strong></h1>
                <h3 className="home-welcome-msg"><strong>Send a Message to a Friend!</strong></h3> 

                <Navbar userLoggedIn={this.props.userLoggedIn}/>
                <br></br>

                <div className="sms-creation">
                    <h4>Send an Emoji Styled Message to a Phone:</h4>
                    <br></br>
                    <form onSubmit={this.sendMessage}>
                        <div className="message-draft">
                            <h5>Phone Number: </h5>
                            <input type="text"
                                onKeyPress={e => this.isInputNumber(e, true)}
                                className="area-code m-2"
                                placeholder="ex. +1"
                                value = {this.state.areaCode}
                                onChange={e => this.setState({areaCode: e.target.value})}
                                />

                            <input type="text"
                                onKeyPress={e => this.isInputNumber(e, false)}
                                className="main-number m-2"
                                placeholder="ex. 1234567890"
                                value = {this.state.mainNumber}
                                onChange={e => this.setState({mainNumber: e.target.value})}
                                />
                        </div>

                        <div className="message-draft">
                            <h5 className="emoji-label">Emoji: </h5>
                            <div className="emoji-picker-box">
                                <ul>
                                    <li><img className="emoji-list-item" id="angry" alt=""src={angryIMG} onClick={() => this.imageSelector('angry')}/></li>
                                    <li><img className="emoji-list-item" id="crying" alt=""src={cryingIMG} onClick={() => this.imageSelector('crying')}/></li>
                                    <li><img className="emoji-list-item" id="happy" alt=""src={happyIMG} onClick={() => this.imageSelector('happy')}/></li>
                                    <li><img className="emoji-list-item" id="hearts" alt=""src={heartsIMG} onClick={() => this.imageSelector('hearts')}/></li>
                                    <li><img className="emoji-list-item" id="neutral" alt=""src={neutralIMG} onClick={() => this.imageSelector('neutral')}/></li>
                                    <li><img className="emoji-list-item" id="party" alt=""src={partyIMG} onClick={() => this.imageSelector('party')}/></li>
                                    <li><img className="emoji-list-item" id="poop" alt=""src={poopIMG} onClick={() => this.imageSelector('poop')}/></li>
                                    <li><img className="emoji-list-item" id="rich" alt=""src={richIMG} onClick={() => this.imageSelector('rich')}/></li>
                                    <li><img className="emoji-list-item" id="sad" alt=""src={sadIMG} onClick={() => this.imageSelector('sad')}/></li>
                                    <li><img className="emoji-list-item" id="sick" alt=""src={sickIMG} onClick={() => this.imageSelector('sick')}/></li>
                                </ul>
                            </div>
                        </div>

                        <div className="message-draft">
                            <h5 className="msg">Message: </h5>
                            <textarea type="text"
                                className="message-input m-2"
                                maxLength="175"
                                value={this.state.body}
                                onChange={e => this.setState({body: e.target.value})}
                                />
                        </div>

                        <br></br>
                        <p id="post-warning" className="post-warning"></p>
                        <div className="message-draft-msg">
                            <input type="submit"
                                value="Send Message"
                                onClick={this.sendMessage}
                                />
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

export default Messaging;
