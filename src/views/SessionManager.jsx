import React, { Component } from 'react';
import Container from "../components/Container";
import { Form } from 'react-bootstrap';
import SessionButton from "../components/SessionButton";
import SessionInput from "../components/SessionInput";
import styles from "../stylesheets/sessionManager.module.css";
import { Link } from "react-router-dom";
import axios from 'axios';
import baseURL from "../config/baseURL";

class SessionManager extends Component {
    state = {
        user_session: '',
        owner_session: '',
    }

    handleInputChange = (inputName, value) => {
        this.setState({[inputName]: value});
    }

    handleCreateNew = () => {
        axios.get(`${baseURL}/session`)
            .then(result => {
                const {user_session, owner_session} = result.data;
                this.setState({user_session, owner_session})
            }).catch(err => alert(err.response.data));
    }

    handleStart = () => {
        const {user_session, owner_session} = this.state;

        axios.post(`${baseURL}/session/start`, {
            user_session,
            owner_session
        }).then(result => alert(result.data))
            .catch(err => alert(err.response.data));
    }

    handleStop = () => {
        const {user_session, owner_session} = this.state;

        axios.post(`${baseURL}/session/stop`, {
            user_session,
            owner_session
        }).then(result => alert(result.data))
            .catch(err => alert(err.response.data));
    }

    handleGo = () => {
        const {user_session, owner_session} = this.state;

        axios.post(`${baseURL}/session/check/owner`, {
            user_session,
            owner_session
        }).then(() => {
            window.localStorage.setItem("user_session", user_session);
            window.localStorage.setItem("owner_session", owner_session);
            window.location.href = "/questions";
        })
            .catch(err => alert(err.response.data));
    }

    render() {
        return (
            <Container>
                <div className={`d-flex align-content-around`}>
                    <div className={styles.leftContainer}>
                        <div>
                            <Form.Label className={styles.label}>
                                Session ID:
                            </Form.Label>
                            <SessionInput onChange={this.handleInputChange} inputName={"user_session"}
                                          value={this.state.user_session}/>
                        </div>

                        <div className="mt-3">
                            <Form.Label className={styles.label}>
                                Owner ID:
                            </Form.Label>
                            <SessionInput onChange={this.handleInputChange} inputName={"owner_session"}
                                          value={this.state.owner_session}/>
                        </div>
                    </div>

                    <div className={`d-flex align-items-end flex-column ${styles.rightContainer}`}>
                        <SessionButton variant="warning" title="New 📝" onClick={this.handleCreateNew}/>
                        <SessionButton variant="success" title="Start 🏁" onClick={this.handleStart}/>
                        <SessionButton variant="danger" title="Stop 🛑" onClick={this.handleStop}/>
                        <SessionButton backgroundColor="rgba(248, 120, 62, 1)" title="Go 🚗" onClick={this.handleGo}/>
                    </div>
                </div>

                <div className="text-center mb-3">
                    <Link to="/" style={{color: "#EEEEEE"}}>no... I'm just an attendee 😂</Link>
                </div>
            </Container>
        );
    }
}

export default SessionManager;
