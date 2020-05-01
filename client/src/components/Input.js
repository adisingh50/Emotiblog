import React, { Component } from 'react';
import '.././styleSheets/Input.css';
import ReactDOM from 'react-dom';

class InfoBar extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <form className="form">
                <input
                    className="input"
                    type="text"
                    placeholder="Type a Message..."
                    value={this.props.message}
                    onChange={(event) => this.props.setMessage(event.target.value)}
                    onKeyPress={event => event.key === 'Enter' ? this.props.sendMessage : null}/>

                <button className="sendButton"
                    onClick={(event) => this.props.sendMessage(event)}>Send</button>
            </form>
        )
    }
}
export default InfoBar;