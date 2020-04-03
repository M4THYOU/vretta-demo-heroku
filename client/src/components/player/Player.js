import React, { Component } from "react";
import { sortGames, renderGame } from "../util/utils"
import { ListGroup } from "reactstrap";

class Player extends Component {

    constructor(props) {
        super(props);
        this.state = {
            games: {

            },
            games_sorted: [

            ]
        };
    }

    componentDidMount() {
        console.log('mounting');
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



    render() {
        const games_sorted = this.state.games_sorted;
        return (
            <div>
                <h2>Player</h2>
                <h3>Games</h3>
                <ListGroup>
                    {
                        games_sorted.map(game => {
                            return renderGame(game, false);
                        }) }
                </ListGroup>
            </div>
        );
    }

}

export default Player;
