import React, { Component } from 'react';

export default class Login extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <form onSubmit={this.props.handleSubmit}>
        <input name="name" type="text" placeholder="name"  onChange={this.props.handleChange} />
        <input name="room" type="text" placeholder="room"  onChange={this.props.handleChange} />
        <button>Join</button>
      </form>
    )
  }
};
