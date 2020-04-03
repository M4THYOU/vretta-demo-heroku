import React, { Component } from "react";
import {
    Button,
    Container,
    Col,
    Row,
    ListGroupItem,
    Label,
    Input,
    InputGroupAddon, InputGroup
} from "reactstrap";
import socketIOClient from 'socket.io-client';
import update from 'immutability-helper';

let sound = require('../../when.mp3');

class CoachGame extends Component {

    constructor(props) {
        super(props);

        // create audio ref.
        this.audioRef = React.createRef();

        this.state = {
            chatTitle: "Current Chat",
            players: [],
            currentChat: [],
            broadcasts: [],
            currentMessage: '',
            selectedPlayer: null,
            showBroadcasts: false,
            messages: {},
            game: null,
            socket: null,
            isActive: {},
            hasUnread: {},
        };

        const pastState = props.location.state;
        if (typeof pastState === 'undefined') {
            const gameId = props.match.params.gameId;

            // get the player list and messages
            fetch('/api/games/' + gameId, {
                method: 'GET'
            })
                .then(res => res.json())
                .then((data) => {
                    this.setState({
                        game: data,
                        players: data.players,
                        messages: data.messages,
                        broadcasts: data.broadcasts,
                        isActive: data.isActive,
                        hasUnread: data.hasUnread
                    });
                });

        } else {
            const game = props.location.state.game;

            this.state = {
                game: game
            };
        }

    }

    exitHandler() {
        // disconnect the user.
        this.state.socket.emit('disconnect');
        window.location.href = "/app/coach";
    }

    componentDidMount() {
        this.state.socket = socketIOClient("http://localhost:5000");

        this.state.socket.on('connect', data => {

            this.state.socket.emit('storeCoachId', {
                userId: localStorage.getItem('uid'),
                gameId: this.props.match.params.gameId,
            });

            this.state.socket.on('receiveMessage', data => {
                this.audioRef.current.play().catch(err => {
                    console.log(err);
                });

                const msg = data.message;
                const playerId = data.playerId;

                if (playerId === this.state.selectedPlayer) {
                    let currChat = this.state.currentChat.slice();
                    currChat.push([msg, false]);

                    // now update state of messages
                    this.setState({
                        messages: update(this.state.messages, {[playerId]: {$set: currChat}}),
                        currentChat: currChat,
                        hasUnread: update(this.state.hasUnread, {[playerId]: {$set: false}}),
                    });

                    // unset it as hasUnread=false on db.
                    this.updateUnread(playerId, false);

                } else { // then we just update messages
                    let currChat = this.state.messages[playerId];
                    if (typeof currChat === "undefined") {
                        currChat = [];
                    }
                    currChat.push([msg, false]);

                    this.setState({
                        messages: update(this.state.messages, {[playerId]: {$set: currChat}}),
                        hasUnread: update(this.state.hasUnread, {[playerId]: {$set: true}}),
                    });
                }

            });

            this.state.socket.on('newPlayerList', data => {

                this.setState({
                    players: data.playerList,
                });
            });

            this.state.socket.on('playerChangeConnection', data => {
                console.log('disconnect');
                const playerId = data.playerId;
                const isActive = data.isActive;

                this.setState({
                    isActive: update(this.state.isActive, {[playerId]: {$set: isActive}}),
                });
                
            });

        });

        // get the player list and messages
        const gameId = this.props.match.params.gameId;
        fetch('/api/games/' + gameId, {
            method: 'GET'
        })
            .then(res => res.json())
            .then((data) => {
                this.setState({
                    players: data.players,
                    messages: data.messages,
                    broadcasts: data.broadcasts,
                    isActive: data.isActive,
                    hasUnread: data.hasUnread
                });
            });

    }

    updateUnread(playerId, unread) {
        fetch('/api/games/unread/' + this.state.game._id, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                playerId: playerId,
                unread: unread
            })
        });
    }

    playerOnClick(player) {
        const playerMessages = this.state.messages[player];

        if (this.state.hasUnread[player]) {
            console.log('update!!');
            this.updateUnread(player, false);
        }

        if (typeof playerMessages === "undefined") {
            this.setState({
                currentChat: [],
                selectedPlayer: player,
                showBroadcasts: false,
                chatTitle: "Current Chat",
                hasUnread: update(this.state.hasUnread, {[player]: {$set: false}}),
            });
        } else {
            this.setState({
                currentChat: playerMessages,
                selectedPlayer: player,
                showBroadcasts: false,
                chatTitle: "Current Chat",
                hasUnread: update(this.state.hasUnread, {[player]: {$set: false}}),
            });
        }
    }

    sendMessage(e) {
        e.preventDefault();

        const receiver = this.state.selectedPlayer;
        const showBroadcasts = this.state.showBroadcasts;
        if (!receiver && !showBroadcasts) { // if no player has been selected, i.e. selectedPlayer is null or undefined.
            console.log("returning...");
            return;
        }

        if (this.state.currentMessage === '') {
            console.log("empty message, returning");
            return;
        }
        
        const sender = localStorage.getItem('uid');
        const message = this.state.currentMessage;
        const gameId = this.state.game._id;

        // update the current client's chat.
        let currChat = this.state.currentChat.slice();

        if (showBroadcasts) {
            const newMsg = [message, true, true];
            currChat.push(newMsg); // third element indicates it's a broadcast message.

            // in this case, update broadcasts state too.
            let currBroadcasts = this.state.broadcasts.slice();
            currBroadcasts.push(newMsg);
            this.setState({ broadcasts: currBroadcasts });
        } else {
            currChat.push([message, true]);
        }

        this.setState({
            messages: update(this.state.messages, {[receiver]: {$set: currChat}}),
            currentChat: currChat,
            currentMessage: ''
        });

        if (showBroadcasts) { // message to all players
            this.state.socket.emit('makeBroadcast', {message: message, gameId: gameId});

            let newMessages = {};
            //Object.keys(this.state.messages).forEach(key => {
            this.state.players.forEach(key => {
                let currMessages = [];
                if (typeof this.state.messages[key] !== 'undefined') {
                    currMessages = this.state.messages[key].slice();
                }

                const newMsg = [message, true, true];
                currMessages.push(newMsg);

                newMessages[key] = currMessages;

            });
            this.setState({
                messages: newMessages
            });

            // create new api endpoint that does this. Horrible idea to loop over api requests.
            console.log('UPDATE THE DB... for every player.');

            fetch('/api/messages/broadcast', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    s_message: message,
                    gameId: gameId,
                })
            });

        } else { // message to 1 player.
            if (this.state.socket !== null) {

                this.state.socket.emit('messageFromCoach', {
                    senderId: sender,
                    message: message,
                    receiverId: receiver,
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
                    playerId: receiver,
                    coachId: sender,
                    s_message: message,
                    gameId: gameId,
                    fromCoach: true
                })
            });
        }

    }

    broadcastInitHandler() {
        this.setState({
            currentChat: this.state.broadcasts,
            selectedPlayer: "broadcast",
            showBroadcasts: true,
            chatTitle: 'Broadcast'
        });
    }

    updateMessage(e) {
        this.setState({
            currentMessage: e.target.value
        })
    }

    renderMarginCol(msg) {
        if (msg[1]) {
            return (
                <Col>

                </Col>
            );
        }
    }

    renderBroadcastBar(msg) {

        if (msg[2]) {
            return (
                    <ListGroupItem className="my-broadcast-bar">
                    </ListGroupItem>
            );
        }

    }

    renderMsg(msg, index) {
        let color = "secondary";
        if (msg[1]) {
            color = "info";
        }

        return (
            <Row key={ index }>
                { this.renderMarginCol(msg) }
                <Col sm='auto' className="no-margin-message">
                    <ListGroupItem color={ color } key={ index }>
                        { msg[0] }
                    </ListGroupItem>
                </Col>
                { this.renderBroadcastBar(msg) }
            </Row>
        )
    }

    renderActiveIndicator(player) {
        if (this.state.isActive[player]) {
            return (
                <Button color="success" className="active-button" outline>Active</Button>
            );
        } else {
            return (
                <Button color="danger" className="active-button" outline>Inactive</Button>
            );
        }
    }

    renderUnread(player) {
        if (this.state.hasUnread[player]) {
            return (
                <Col>
                    <h1 className="message-indicator">&#x2022;</h1>
                </Col>
            );
        }
    }

    renderPlayer(player) {
        let classes = "player-row";
        if (this.state.selectedPlayer === player) {
            classes += " selected";
        }
        return (
            <Row onClick={() => this.playerOnClick(player)} key={ player } className={ classes }>
                <Col xs="6" key={ player }>
                    { player }
                </Col>
                <Col xs="3">
                    { this.renderActiveIndicator(player) }
                </Col>
                    { this.renderUnread(player) }
            </Row>
        )
    }

    renderPlayers() {
        let players = [];
        if (this.state !== null && typeof this.state !== 'undefined') {
            players = this.state.players;
        }

        if (players === undefined || players.length === 0) {
            return (<p>Looking for players...</p>);
        } else {
            return (
                <Container>
                    {
                        players.map(player => {
                            return this.renderPlayer(player);
                        })
                    }
                </Container>
            );
        }

    }

    renderBroadcastButton() {
        if (this.state.selectedPlayer === "broadcast") {
            return (
                <Button color="info" onClick={() => this.broadcastInitHandler()}>Broadcast</Button>
            );
        } else {
            return (
                <Button color="info" onClick={() => this.broadcastInitHandler()} outline>Broadcast</Button>
            );
        }
    }

    render() {
        let currentChat = this.state.currentChat;
        if (typeof currentChat === 'undefined') {
            currentChat = [];
        }

            return (
                <Container className="outer-container">
                    <audio id="message-sound" ref={ this.audioRef } src={ sound }></audio>
                    <Button className="float-sm-left" color="danger" onClick={() => { this.exitHandler() }}>EXIT</Button>
                    <Row className="outer-row">
                        <Col xs="6">
                            <h2>Broadcast</h2>
                            { this.renderBroadcastButton() }
                            <h2>Players</h2>
                            { this.renderPlayers() }
                        </Col>

                        <Col xs="6" className="chat-view">
                            <h2>{ this.state.chatTitle }</h2>
                            <h6>{ this.state.selectedPlayer }</h6>
                            {
                                currentChat.map((msg, index) => {
                                    return this.renderMsg(msg, index);
                                })
                            }
                        </Col>
                        <Col xs={{ size: 6, offset: 6 }}>
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

export default CoachGame;
