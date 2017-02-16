import React, { Component } from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';

function focus(e) {
  if (e) { e.focus(); }
}

const NewTodoItem = class NewTodoItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errorMessage: '',
      input: '',
    };
  }

  handleSave() {
    if (this.state.input.length === 0) {
      this.setState({ errorMessage: 'This field is required' });
    } else {
      const errorMessage = this.props.handleSave(this.state.input);
      if (errorMessage) {
        this.setState({ errorMessage });
      } else {
        this.setState({ errorMessage: '' });
        this.handleClose();
      }
    }
  }

  handleChange(e) {
    this.setState({ input: e.target.value });
  }

  handleKeyPress(e) {
    if (e.key === 'Enter') {
      this.handleSave(e);
    }
  }

  handleClose() {
    this.props.handleClose();
    this.setState({
      errorMessage: '',
      input: '',
    });
  }

  render() {
    const dialogActions = [
      <FlatButton
        label="Cancel"
        primary={false}
        onTouchTap={this.props.handleClose}
      />,
      <FlatButton
        label="Confirm"
        primary
        onTouchTap={e => this.handleSave(e)}
      />,
    ];

    return (
      <Dialog
        title="Add a new item"
        actions={dialogActions}
        modal={false}
        open={this.props.open}
        onRequestClose={e => this.handleClose(e)}
      >
        <TextField
          fullWidth
          hintText="Go to grocery store"
          errorText={this.state.errorMessage}
          onKeyPress={e => this.handleKeyPress(e)}
          onChange={e => this.handleChange(e)}
          ref={e => focus(e)}
        />
      </Dialog>
    );
  }
};

NewTodoItem.defaultProps = {
  handleSave: () => {},
  handleClose: () => {},
  open: false,
};

NewTodoItem.propTypes = {
  handleSave: React.PropTypes.func,
  handleClose: React.PropTypes.func,
  open: React.PropTypes.bool,
};

export default NewTodoItem;
