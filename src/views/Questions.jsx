import React, { Component } from 'react';
import { Form, Button, Col, Row } from 'react-bootstrap';
import styles from "../stylesheets/questions.module.css";
import Question from "../components/Question";
import axios from 'axios';
import baseURL from '../config/baseURL';
import QuestionContainer from "../components/QuestionContainer";

class Questions extends Component {
    constructor(props) {
        super(props);
        this.fetchAllQuestions = this.fetchAllQuestions.bind(this);
    }

    state = {
        questions: [],
        user_session: "",
        question_description: ""
    }

    componentDidMount() {
        const user_session = window.localStorage.getItem("user_session");
        // this.setState({user_session}, () => {
        //     this.timer = setInterval(this.fetchAllQuestions, 500);
        // });

        this.setState({user_session}, this.fetchAllQuestions);
    }

    componentWillUnmount() {
        clearInterval(this.timer);
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
            this.setState({question_description: ""})
            this.fetchAllQuestions();
            alert(result.data);
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

    handleRefresh = () => {
        this.fetchAllQuestions();
    }


    render() {
        return (
            <QuestionContainer
                user_session={this.state.user_session}
                isQuestionsPage={true}
                handleExit={this.handleExit}
                handleRefresh={this.handleRefresh}
            >
                <div className={`${styles.postQuestions}`}>
                    <div className={styles.postQuestionsLeft}>
                        <Form.Label>Ask a Question</Form.Label>
                        <Form.Control as="textarea" row={4} onChange={this.handleQuestionChange}
                                      value={this.state.question_description}/>
                    </div>

                    <div className={styles.postQuestionsRight}>
                        <Button variant={"success"} className={"w-75"} onClick={this.handleQuestionPost}>Post</Button>
                    </div>
                </div>

                <Row xs={1} md={2} lg={3} className="g-4 mt-1">
                    {this.state.questions.map((question, i) =>
                        <Col key={i}>
                            <Question index={i + 1} description={question.question_description}
                                      questionID={question.question_id} isAnswered={question.is_answered}/>
                        </Col>
                    )}
                </Row>
            </QuestionContainer>
        );
    }
}

export default Questions;
