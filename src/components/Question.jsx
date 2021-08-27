import React, { Component } from 'react';
import { Button, Card } from "react-bootstrap";
import styles from "../stylesheets/question.module.css";
import {Link} from 'react-router-dom';

class Question extends Component {

    handleViewButton = () => {
        this.props.history.push(`/questions/detail/${this.props.questionID}`);
    }

    handleAnswerButton = () => {
        this.props.history.push(`/questions/detail/${this.props.questionID}`);
    }


    render() {
        return (
            <Card className={this.props.isAnswered && "bg-secondary opacity-75"}>
                <Card.Header as="h5">#{this.props.index}</Card.Header>
                <Card.Body>
                    <Card.Text className={`${styles.questionDescription}`}>
                        {this.props.description}
                    </Card.Text>
                    <div className={"d-flex justify-content-end"}>
                        <Link to={`/questions/detail/${this.props.questionID}`} />
                        {window.localStorage.getItem("owner_session") ? <Button variant={this.props.isAnswered ? "danger":"outline-danger"} size={"sm"} onClick={this.handleAnswerButton}>Answer</Button> :
                            <Button variant={this.props.isAnswered ? "danger":"outline-danger"} size={"sm"} onClick={this.handleViewButton}>View</Button>}
                    </div>
                </Card.Body>
            </Card>
        );
    }
}

export default Question;
