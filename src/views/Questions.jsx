import React, { Component } from 'react';
import { Form, Button, Col, Row } from 'react-bootstrap';
import styles from "../stylesheets/questions.module.css";
import Question from "../components/Question";
import axios from 'axios';
import baseURL from '../config/baseURL';

class Questions extends Component {
    state = {
        questions: [],
        user_session: "",
        question_description: ""
    }

    componentDidMount() {
        const user_session = window.localStorage.getItem("user_session");
        this.setState({user_session}, this.fetchAllQuestions);
    }

    fetchAllQuestions = () => {
        axios.get(`${baseURL}/question/getAll?user_session=${this.state.user_session}`)
            .then(result => this.setState({questions: result.data}))
            .catch(err => alert(err.response.data));
    }

    handleQuestionPost = () => {
        const {question_description, user_session} = this.state;

        axios.post(`${baseURL}/question/postQuestion`, {
            user_session: user_session,
            question: question_description
        }).then((result) => {
            this.fetchAllQuestions();
            alert(result);
        }).catch(err => alert(err.response.data));
    }

    handleQuestionChange = e => {
        const question_description = e.target.value;
        this.setState({question_description});
    }

    handleExit = () => {
        window.location.href = "/";
        window.localStorage.clear();
    }


    render() {
        return (
            <div className={styles.container}>
                <div className={`d-flex justify-content-between ${styles.header}`}>
                    <Button variant="danger" className={styles.headerButton} onClick={this.handleExit}>Exit</Button>
                    <h5 className={`pt-1`}>Session ID: <strong>{this.state.user_session}</strong></h5>
                    <Button variant="success" className={styles.headerButton}>Refresh</Button>
                </div>

                <div className={`${styles.postQuestions}`}>
                    <div className={styles.postQuestionsLeft}>
                        <Form.Label>Ask a Question</Form.Label>
                        <Form.Control as="textarea" row={4} onChange={this.handleQuestionChange}/>
                    </div>

                    <div className={styles.postQuestionsRight}>
                        <Button variant={"success"} className={"w-75"} onClick={this.handleQuestionPost}>Post</Button>
                    </div>
                </div>

                <Row xs={1} md={2} lg={3} className="g-4 mt-1">
                    {this.state.questions.map((question, i) =>
                        <Col key={i}>
                            <Question index={i + 1} description={question.question_description}
                                      questionID={question.question_id}/>
                        </Col>
                    )}
                </Row>
            </div>

        );
    }
}

export default Questions;
