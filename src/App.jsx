import React, { Component } from "react";

export default class App extends Component {
  static displayName = App.name;

  constructor(props) {
    super(props);
    this.state = {
      message: "",
      loading: false,
      products: [
        { id: 1, name: 'Product 1', price: 10.99 },
        { id: 2, name: 'Product 2', price: 19.99 },
        { id: 3, name: 'Product 3', price: 5.99 },
      ],
      cart: [],
    };
  }

  // Function to receive messages when the "Receive Request" button is clicked
  receiveData = () => {
    this.setState({ loading: true, message: "" });

    // Replace 'YOUR_ENDPOINT' with the actual endpoint URL for receiving messages
    fetch("https://webapi20231027004927.azurewebsites.net", {
      method: "GET",
    })
      .then((response) => {
        if (response.ok) {
          return response.text();
        } else {
          throw new Error("Failed to receive data from the server");
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
    fetch("https://webapi20231027004927.azurewebsites.net", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify("Your message to send to the endpoint"),
    })
      .then((response) => {
        if (response.ok) {
          return response.text();
        } else {
          throw new Error("Failed to send data to the server");
        }
      })
      .then((data) => {
        this.setState({ message: data, loading: false });
      })
      .catch((error) => {
        this.setState({ message: `Error: ${error.message}`, loading: false });
      });
  };

  addToCart = (product) => {
    this.setState((prevState) => ({
      cart: [...prevState.cart, product],
    }));
  };

  render() {
    return (
      <div>
        <h2>Product List</h2>
        <ul>
          {this.state.products.map((product) => (
            <li key={product.id}>
              {product.name} - ${product.price}
              <button onClick={() => this.addToCart(product)}>Add to Cart</button>
            </li>
          ))}
        </ul>

        <h2>Shopping Cart</h2>
        <ul>
          {this.state.cart.map((product) => (
            <li key={product.id}>
              {product.name} - ${product.price}
            </li>
          ))}
        </ul>
      </div>
    );
  }
}
