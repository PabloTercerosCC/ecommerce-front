import React, { Component } from 'react';

export default class App extends Component {
    static displayName = App.name;

    constructor(props) {
        super(props);
        this.state = { message: "", loading: false };
    }

    // Function to receive messages when the "Receive Request" button is clicked
    receiveData = () => {
        this.setState({ loading: true, message: "" });

        // Replace 'YOUR_ENDPOINT' with the actual endpoint URL for receiving messages
        fetch('https://localhost:7166/Products', {
            method: 'GET',
        })
            .then((response) => {
                if (response.ok) {
                    return response.text();
                } else {
                    throw new Error('Failed to receive data from the server');
                }
            })
            .then((data) => {
                this.setState({ message: data, loading: false });
            })
            .catch((error) => {
                this.setState({ message: `Error: ${error.message}`, loading: false });
            });
    };

    // Function to send a message to the endpoint
    sendData = () => {
        this.setState({ loading: true, message: "" });

        // Replace 'YOUR_ENDPOINT' with the actual endpoint URL for sending messages
        fetch('https://localhost:7166/Products', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify('Your message to send to the endpoint'),
        })
            .then((response) => {
                if (response.ok) {
                    return response.text();
                } else {
                    throw new Error('Failed to send data to the server');
                }
            })
            .then((data) => {
                this.setState({ message: data, loading: false });
            })
            .catch((error) => {
                this.setState({ message: `Error: ${error.message}`, loading: false });
            });
    };

    render() {
        return (
            <div>
                <button onClick={this.sendData}>Send Request</button>
                <button onClick={this.receiveData}>Receive Request</button>
                {this.state.loading ? <p>Loading...</p> : <p>{this.state.message}</p>}
            </div>
        );
    }
}