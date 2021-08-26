import React, { Component } from 'react';
import { FormControl } from "react-bootstrap";
import PropTypes from "prop-types";

class SessionInput extends Component {
    render() {
        return (
            <FormControl
                type="text"
                style={{...inputStyles, textAlign: this.props.textAlign}}
                onChange={e => this.props.onChange(this.props.inputName, e.target.value)}
                value={this.props.value}
                minLength="10"
                maxLength="10"
            />
        );
    }
}

SessionInput.propTypes = {
    textAlign: PropTypes.string,
    onChange: PropTypes.func,
    inputName: PropTypes.string,
    value: PropTypes.any,
}

SessionInput.defaultProps = {
    textAlign: "left",
}

export default SessionInput;

const inputStyles = {
    fontSize: "1.1rem",
    backgroundColor: "rgb(79, 73, 122)",
    color: "white",
    border: "none",
}
