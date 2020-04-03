import React, { Component } from "react";
import { Button, ButtonGroup } from "reactstrap";
import { v4 as uuidv4 } from "uuid";

class TheApp extends Component {

    constructor(props) {
        super(props);
        this.state = {
            //
        };
    }

    redirectHandler(isCoach) {

        //generate uuid.
        let uid = uuidv4();
        localStorage.setItem("uid", uid);
        localStorage.setItem("isCoach", isCoach);

        if (isCoach) {
            this.props.history.push('/app/coach/');
        } else {
            this.props.history.push('/app/player/');
        }

    }

    render() {

        const isCoachVal = localStorage.getItem("isCoach");

        if (isCoachVal === 'false') {
            this.props.history.push('/app/player');
        } else if (isCoachVal === 'true') {
            this.props.history.push('/app/coach');
        }

        localStorage.getItem("uid");

        return (
            <div>
                <h2>App</h2>
                <ButtonGroup>
                    <Button outline color="primary" onClick={() => { this.redirectHandler(true) }}>Coach</Button>
                    <Button outline color="primary" onClick={() => { this.redirectHandler(false) }}>Player</Button>
                </ButtonGroup>

            </div>
        );
    }

}

export default TheApp;
