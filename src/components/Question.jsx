import React, { Component } from 'react';
import { Button, Card } from "react-bootstrap";
import styles from "../stylesheets/question.module.css";

class Question extends Component {

    handleViewButton = (questionID) => {

    }

    handleAnswerButton = (questionID) => {

    }


    render() {
        return (
            <Card>
                <Card.Header as="h5">#{this.props.index}</Card.Header>
                <Card.Body>
                    <Card.Text className={`${styles.questionDescription}`}>
                        {this.props.description}
                    </Card.Text>
                    <div className={"d-flex justify-content-end"}>
                        <Button variant="outline-danger" size={"sm"}
                                onClick={() => this.handleViewButton(this.props.questionID)}>View</Button>
                        <Button variant="outline-danger" size={"sm"}
                                onClick={() => this.handleAnswerButton(this.props.questionID)}>Answer</Button>
                    </div>
                </Card.Body>
            </Card>
        );
    }
}

export default Question;
