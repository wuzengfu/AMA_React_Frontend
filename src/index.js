import React from 'react';
import ReactDOM from 'react-dom';
import Welcome from './views/Welcome';
import SessionManager from "./views/SessionManager";
import Questions from "./views/Questions";
import AnswerQuestion from "./views/AnswerQuestion";
import { BrowserRouter as Router, Route } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";


ReactDOM.render(
    <Router>
        <Route exact path="/" component={Welcome}/>
        <Route exact path="/session" component={SessionManager}/>
        <Route exact path="/questions" component={Questions} />
        <Route exact path="/questions/detail/:question_id" component={AnswerQuestion} />
    </Router>,
    document.getElementById('root')
);
