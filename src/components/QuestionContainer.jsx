import React, { Component } from 'react';
import { Button } from "react-bootstrap";

class QuestionContainer extends Component {
    render() {
        return (
            <div style={styles.container}>
                <div style={styles.header}>
                    <Button variant="danger" style={styles.headerButton}
                            onClick={this.props.handleExit}>{this.props.isQuestionsPage ? "Exit" : "Back"}</Button>
                    <h5 className={`pt-1`}>Session ID: <strong>{this.props.user_session}</strong></h5>
                    {this.props.isQuestionsPage ?
                        <Button variant="success" style={styles.headerButton} onClick={this.props.handleRefresh}>Refresh</Button> : <div />}
                </div>
                {this.props.children}
            </div>
        )
    }
}

export default QuestionContainer;

const styles = {
    container: {
        width: "80%",
        margin: "1% auto auto"
    },

    header: {
        display: "flex",
        justifyContent: "space-between",
        backgroundColor: "#F49D3B",
        padding: "1%"
    },

    headerButton: {
        paddingLeft: "1.5%",
        paddingRight: "1.5%"
    }
}
