import React, { Component } from 'react';
import PropTypes from 'prop-types';

class TodoItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: this.props.text
    };
  }

  render() {
    return (
      <li className="TodoItem">
      {this.state.text}
      </li>
    );
  }
}

TodoItem.PropTypes = {
  text: PropTypes.string.isRequired
}

export default TodoItem;
