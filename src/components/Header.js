import React, { Component } from 'react'
import AppBar from 'material-ui/AppBar'
import IconButton from 'material-ui/IconButton';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import FlatButton from 'material-ui/FlatButton';
import { connect } from 'react-redux'

const styles = {
    titleText: {
        margin: '-8px 0px',
        paddingTop: '0px',
        letterSpacing: '0px',
        fontSize: '24px',
        fontWeight: 400,
        color: 'rgb(255, 255, 255)',
        height: '64px',
        lineHeight: '64px',
        flex: '1 1 0%'
    }
}

// Decorator will inject store's return into this.props
@connect((store) => {
    return {
        todos: store.todo.items,
        fetching: store.todo.fetching,
        fetched: store.todo.fetched,
        error: store.todo.error,
    }
})
export default class Header extends Component {

    renderStats() {
        let checkedCount = this.props.todos.filter((item) => { return item.checked}).length;
        return (
            <div style={styles.titleText}>
                {'Total: ' + this.props.todos.length}
                &nbsp;
                -
                &nbsp;
                {'Checked: ' + checkedCount}
            </div>
        )
    }

    render() {
        return (
            <AppBar
                title={this.props.title}
                iconElementLeft={<div></div>}
                iconElementRight={this.renderStats()}
            />
        )
    }
}
