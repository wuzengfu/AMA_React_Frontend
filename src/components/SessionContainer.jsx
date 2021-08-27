import React, { Component } from 'react';

class SessionContainer extends Component {
    render() {
        return (
            <div className="d-flex align-items-center justify-content-center vh-100" style={rootStyles}>
                <div style={containerStyles}>
                    {this.props.children}
                </div>
            </div>
        );
    }
}

export default SessionContainer;

const rootStyles = {
    backgroundColor: "rgb(247, 248, 245)"

}
const containerStyles = {
    backgroundColor: "rgba(103, 93, 166, 1)",
    width: "30%",
    padding: "1%"
}
