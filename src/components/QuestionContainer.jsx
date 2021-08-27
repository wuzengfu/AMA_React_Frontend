import React, { Component } from 'react';
import { Button, Spinner } from "react-bootstrap";

class QuestionContainer extends Component {
    state = {
        isLoading: false
    }

    handleRefresh = () => {
        this.setState({isLoading: true})
        setTimeout(async () => {
            await this.props.handleRefresh();
            await this.setState({isLoading: false});
        }, 800);
    }

    render() {
        return (
            <div style={styles.container}>
                <div style={styles.header}>
                    <Button variant="danger" style={styles.headerButton}
                            onClick={this.props.handleExit}>{this.props.isQuestionsPage ? "Exit" : "Back"}</Button>
                    <h5 className={`pt-1`}>Session ID: <strong>{this.props.user_session}</strong></h5>
                    {this.props.isQuestionsPage ?
                        (<Button variant="success" style={styles.headerButton}
                                 onClick={this.handleRefresh}>{this.state.isLoading ?
                            <Spinner variant={"white"} className={"opacity-75"} size={"sm"} animation={"border"}/> :
                            <span>Refresh</span>}</Button>) : <div/>}
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
