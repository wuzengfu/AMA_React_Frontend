import React from "react";
import { Button, Spinner } from "react-bootstrap";
import PropTypes from 'prop-types';

class SessionButton extends React.Component {
    state = {
        isLoading: false
    }

    handleOnClick = () => {
        this.setState({isLoading: true});

        setTimeout(async () => {
            await this.props.onClick();
            await this.setState({isLoading: false});
        }, 800);
    }

    render() {
        return (
            <Button
                variant={this.props.variant}
                size="sm"
                style={{
                    ...buttonStyles,
                    ...this.props.style,
                    backgroundColor: this.props.backgroundColor
                }}
                onClick={this.handleOnClick}
            >
                {this.state.isLoading ? <Spinner animation={"border"} size={"sm"} variant={"dark"}/> :
                    <span>{this.props.title}</span>}
            </Button>
        )
    }
}

SessionButton.propTypes = {
    title: PropTypes.string.isRequired,
    variant: PropTypes.string,
    backgroundColor: PropTypes.string,
    style: PropTypes.object,
    onClick: PropTypes.func
}

export default SessionButton;

const buttonStyles = {
    marginTop: "6%",
    marginBottom: "6%",
    paddingTop: "5%",
    paddingBottom: "5%",
    fontWeight: "800",
    width: "100%",
    color: "white",
    opacity: 0.8
}
