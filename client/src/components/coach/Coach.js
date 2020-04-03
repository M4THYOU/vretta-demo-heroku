import React, { Component } from "react";
import { Button, ListGroup } from "reactstrap";
import { withRouter } from "react-router";
import { sortGames, renderGame } from "../util/utils";

class Coach extends Component {

    constructor(props) {
        super(props);
        this.state = {
            games: {

            },
            games_sorted: [

            ],
        };
    }

    componentDidMount() {
        fetch('/api/games')
            .then(res => res.json())
            .then((data) => {
                let games = {};
                data.forEach(item => {
                    games[item._id] = {date: item.date, coachId: item.coachId};
                });

                const arr = sortGames(games);
                this.setState({games: games, games_sorted: arr});
            })
    }

    newGame() {
        const coachId = localStorage.getItem('uid');
        fetch('/api/games', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                coachId: coachId,
            })
        })
            .then(res => res.json())
            .then((data) => {
                let games = this.state.games;
                games[data._id] = {date: data.date, coachId: data.coachId};

                let arr = sortGames(games);

                this.setState({games: games, games_sorted: arr});

                this.props.history.push({
                    pathname: '/app/coach/' + data._id,
                    state: {game: data}
                });


            });
    }

    render() {
        const games_sorted = this.state.games_sorted;
        return (
            <div>
                <h2>Coach</h2>
                <Button color="primary" onClick={() => { this.newGame() } }>Create Game</Button>
                <h3>Games</h3>
                <ListGroup>
                    {
                        games_sorted.map(game => {
                            return renderGame(game, true);
                    }) }
                </ListGroup>
            </div>
        );
    }

}

export default withRouter(Coach);
