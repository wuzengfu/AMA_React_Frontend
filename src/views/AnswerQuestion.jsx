import React, { Component } from 'react';
import QuestionContainer from "../components/QuestionContainer";
import axios from "axios";
import baseURL from '../config/baseURL';
import styles from '../stylesheets/answerQuestion.module.css';
import { Form, Button } from "react-bootstrap";

class AnswerQuestion extends Component {
    state = {
        isOwner: false,
        user_session: '',
        owner_session: '',
        question: '',
        answer: '',
        question_id: '',
    }

    componentDidMount() {
        const user_session = window.localStorage.getItem("user_session");
        const owner_session = window.localStorage.getItem("owner_session");
        const {question_id} = this.props.match.params;
        const isOwner = owner_session != null;

        axios.get(`${baseURL}/question/byId?user_session=${user_session}&question_id=${question_id}`)
            .then(result => {
                this.setState({question: result.data})
            });
        this.setState({isOwner, owner_session, user_session, question_id});
    }

    handleGoBack = () => {
        this.props.history.goBack();
    }

    handleInputChange = (inputName, value) => {
        this.setState({[inputName]: value});
    }

    handleSubmit = () => {
        const {answer, user_session, owner_session, question_id} = this.state;

        axios.post(`${baseURL}/question/postAnswer`, {
            answer, user_session, owner_session, question_id
        }).then(result => {
            alert(result.data);
            this.handleGoBack();
        }).catch(err => alert(err.response.data));
    }

    render() {
        return (
            <QuestionContainer
                user_session={this.state.user_session}
                isQuestionsPage={false}
                handleExit={this.handleGoBack}
            >
                <div className={styles.displayQuestion}>
                    <h5>{this.state.question.question_description}</h5>
                </div>

                <div className={styles.answerQuestion}>
                    <Form.Label as={"h4"}>
                        Answer Question:
                    </Form.Label>
                    <Form.Control as={"textarea"} row={7} className={"bg-light"}
                                  onChange={e => this.handleInputChange("answer", e.target.value)}/>
                    <div className={"d-flex justify-content-end mt-2"}>
                        <Button variant={"success"} onClick={this.handleSubmit}>Submit</Button>
                    </div>
                </div>
            </QuestionContainer>
        );
    }
}

export default AnswerQuestion;
