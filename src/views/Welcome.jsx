import React, { Component } from 'react';
import SessionContainer from "../components/SessionContainer";
import { Form } from "react-bootstrap";
import { FcManager } from "react-icons/all";
import SessionButton from "../components/SessionButton";
import SessionInput from "../components/SessionInput";
import { Link } from "react-router-dom";
import baseURL from '../config/baseURL';
import axios from 'axios';

class Welcome extends Component {
    state = {
        user_session: ''
    }

    handleGoButton = () => {
        const {user_session} = this.state;
        axios.get(`${baseURL}/session/status?user_session=${user_session}`)
            .then(result => {
                window.localStorage.setItem("user_session", user_session);
                window.location.href = "/questions";
            }).catch(err => alert(err.response.data));
    }

    handleInputChange = (inputName, value) => {
        this.setState({[inputName]: value});
    }

    render() {
        return (
            <SessionContainer>
                <div className="text-center" style={styles.container}>
                    <h5 className="text-white mt-4 mb-4 fw-bold">Welcome to Ask Me Anything 🎉</h5>
                    <div className="w-75 m-auto">
                        <Form.Label style={styles.label}>
                            Enter your session ID:
                        </Form.Label>
                        <SessionInput textAlign="center" onChange={this.handleInputChange} inputName={"user_session"}/>

                        <SessionButton
                            backgroundColor="rgba(248, 120, 62, 1)"
                            style={styles.goButton}
                            title="Go 🚗"
                            onClick={this.handleGoButton}
                        />
                        <Link to="/session" className="d-block text-white mb-2 mt-1">I am an owner <FcManager/></Link>
                    </div>
                </div>
            </SessionContainer>
        );
    }
}

export default Welcome;

const styles = {
    label: {
        color: "rgb(248, 120, 62)"
    },

    goButton: {
        marginTop: "7%",
        width: "28%",
        paddingTop: "2%",
        paddingBottom: "2%"
    },

    container: {
        width: "80%",
        margin: "auto",
        marginTop: "1%"
    }
}
