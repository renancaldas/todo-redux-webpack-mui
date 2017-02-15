import React, { Component } from 'react'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import ReactDOM from 'react-dom';

export default class NewTodoItem extends Component {
    constructor(props) {
        super(props)
        this.state = {
            errorMessage: '',
            input: ''
        }
    }

    handleSave() {
        console.log(this.state.input)
        if(this.state.input.length === 0) {
            this.setState({errorMessage: 'This field is required'})
        }
        else {
            let errorMessage = this.props.handleSave(this.state.input);
            if(errorMessage) {
                this.setState({errorMessage: errorMessage})
            }
            else {
                this.setState({errorMessage: ''})
                this.handleClose();
            }
        }
    }

    handleChange(e) {
        this.setState({input: e.target.value})
    }

    handleKeyPress(e) {
        if (e.key === 'Enter')
            this.handleSave(e)
    }

    handleClose() {
        this.props.handleClose();
        this.setState({
            errorMessage: '',
            input: ''
        })
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
                primary={true}
                onTouchTap={e => {this.handleSave(e)}}
            />,
        ];

        return (
            <Dialog
                 title="Add a new item"
                 actions={dialogActions}
                 modal={false}
                 open={this.props.open}
                 onRequestClose={e => {this.handleClose(e)}}
            >
                <TextField
                    fullWidth={true}
                    hintText="Go to grocery store"
                    errorText={this.state.errorMessage}
                    onKeyPress={e => this.handleKeyPress(e)}
                    onChange={e => this.handleChange(e)}
                    ref={(e) => { if (e) { e.focus() }}}
                />
            </Dialog>
        )
    }
}
