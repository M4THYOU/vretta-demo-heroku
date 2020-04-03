import React, { Component } from "react";
import {Label, Input, Button, Container, Row, Col, InputGroup, InputGroupAddon, ListGroupItem} from "reactstrap";
import socketIOClient from "socket.io-client";

let sound = require('../../when.mp3');

class PlayerChat extends Component {

    constructor(props) {
        super(props);

        // create audio ref.
        this.audioRef = React.createRef();

        const game = props.location.state.game;

        this.state = {
            currentChat: [],
            currentMessage: '',
            game: game,
            socket: null
        };
    }

    exitHandler() {
        // disconnect the user.
        this.state.socket.emit('disconnect');
        window.location.href = "/app/player";
    }

    componentDidMount() {
        this.state.socket = socketIOClient("http://localhost:5000");

        const uid = localStorage.getItem('uid');

        this.state.socket.on('connect', data => {

            this.state.socket.emit('storePlayerId', {
                userId: uid,
                gameId: this.state.game._id
            });

            this.state.socket.on('receiveMessage', data => {
                this.audioRef.current.play().catch(err => {
                    console.log(err);
                });

                const msg = data.message;

                let currChat = this.state.currentChat.slice();
                currChat.push([msg, true]);
                this.setState({
                    currentChat: currChat
                });

            });

            this.state.socket.on('receiveBroadcast', data => {
                this.audioRef.current.play().catch(err => {
                    console.log(err);
                });

                const msg = data.message;

                let currChat = this.state.currentChat.slice();
                currChat.push([msg, true, true]);
                this.setState({
                    currentChat: currChat
                });

            });

        });

        // get the player list and messages
        fetch('/api/games/' + this.state.game._id, {
            method: 'GET'
        })
            .then(res => res.json())
            .then((data) => {
                const playerChat = data.messages[uid];
                let currChat = [];
                if ((typeof uid !== 'undefined') && (typeof playerChat !== 'undefined')) {
                    currChat = playerChat;
                }

                this.setState({ currentChat: currChat });

            });

    }

    sendMessage(e) {
        e.preventDefault();

        if (this.state.currentMessage === '') {
            console.log("empty message, returning");
            return;
        }

        const sender = localStorage.getItem('uid');
        const message = this.state.currentMessage;
        const receiver = this.state.game.coachId;
        const gameId = this.state.game._id;

        // update the current client's chat.
        let currChat = this.state.currentChat.slice();
        currChat.push([message, false]);
        this.setState({
            currentChat: currChat,
            currentMessage: ''
        });

        if (this.state.socket !== null) {

            this.state.socket.emit('messageFromPlayer', {
                senderId: sender,
                message: message,
                gameId: gameId
            });

        }

        fetch('/api/messages/send', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                playerId: sender,
                coachId: receiver,
                s_message: message,
                gameId: gameId,
                fromCoach: false
            })
        });

    }

    updateMessage(e) {
        this.setState({
            currentMessage: e.target.value
        })
    }

    renderMarginCol(msg) {
        if (!msg[1]) {
            return (
                <Col>

                </Col>
            );
        }
    }

    renderBroadcastBar(msg) {

        if (msg[2]) {
            return (
                <ListGroupItem className="not-my-broadcast-bar">
                </ListGroupItem>
            );
        }

    }
    renderMsg(msg, index) {
        let color = "secondary";
        if (!msg[1]) {
            color = "info";
        }
        return (
            <Row key={ index }>
                { this.renderMarginCol(msg) }
                { this.renderBroadcastBar(msg) }
                <Col sm='auto' className="no-margin-message">
                    <ListGroupItem color={ color } key={ index }>
                        { msg[0] }
                    </ListGroupItem>
                </Col>
            </Row>
        )
    }

    render() {
        const currentChat = this.state.currentChat;

        return (
            <Container className="outer-container">
                <audio id="message-sound" ref={ this.audioRef } src={ sound }></audio>
                <Button className="float-sm-left" color="danger" onClick={() => { this.exitHandler() }}>EXIT</Button>
                <Row className="outer-row">
                    <Col sm={{ size: 6, offset: 3 }} className="chat-view">
                        <h2>Current Chat</h2>
                        {
                            currentChat.map((msg, index) => {
                                return this.renderMsg(msg, index);
                            })
                        }

                    </Col>
                    <Col sm={{ size: 6, offset: 3 }}>
                        <InputGroup>
                            <Label for="message" hidden>Type here...</Label>
                            <Input type="text" name="message" id="message" placeholder="Type here..."
                                   value={ this.state.currentMessage } onChange={ e => this.updateMessage(e) }
                            />
                            <InputGroupAddon addonType="append">
                                <Button onClick={ (e) => this.sendMessage(e) }>Send</Button>
                            </InputGroupAddon>

                        </InputGroup>
                    </Col>
                </Row>
            </Container>
        );
    }

}

export default PlayerChat;
