import React, { Component } from 'react'
import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card';
import { List, ListItem } from 'material-ui/List';
import Checkbox from 'material-ui/Checkbox';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Divider from 'material-ui/Divider';
import CircularProgress from 'material-ui/CircularProgress';
import ActionDelete from 'material-ui/svg-icons/action/delete';
import ActionInfoOutline from 'material-ui/svg-icons/action/info-outline';
import IconButton from 'material-ui/IconButton';

// Redux
import { connect } from 'react-redux'
import { fetchTodos, addTodo, checkTodo, deleteTodo } from '../actions/todoActions'

 // Internal components
import NewTodoModal from './NewTodoModal'

const styles = {
    center: {
        textAlign: 'center'
    },
    checkedItem: {
        textDecoration: 'line-through'
    },
    rightIconButton: {
        top: '10px',
        zIndex: 10
    },
    iconNoItems: {
        height: '60px',
        width: '60px',
        color: 'rgba(0, 0, 0, 0.4)'
    }
};

// Decorator will inject store's return into this.props
@connect((store) => {
    return {
        todos: store.todo.items,
        fetching: store.todo.fetching,
        fetched: store.todo.fetched,
        error: store.todo.error,
    }
})
export default class Todo extends Component {
    state = {
        openNewTodo: false
    }

    componentWillMount() {
        // Dispach action to todoReducer
        this.props.dispatch(fetchTodos())
    }

    handleNewTodoOpen() {
        this.setState({openNewTodo: true});
    }

    handleNewTodoClose() {
        this.setState({openNewTodo: false});
    }

    handleCheckItem(id) {
        // Dispach action to todoReducer
        this.props.dispatch(checkTodo(id))
    }

    handleDeleteItem(id) {
        // Dispach action to todoReducer
        this.props.dispatch(deleteTodo(id))
    }

    handleNewTodoSave(newItem) {
        let { todos } = this.props;
        var result = todos.filter(item => { return item.name === newItem })

        if(result.length > 0) {
            return 'Item already added.'
        }
        else {
            // Dispach action to todoReducer
            this.props.dispatch(addTodo(newItem))
            return null
        }
    }

    renderTodos() {
        var todos = '';
        if(this.props.fetching) {
            todos = (
                <div style={styles.center}>
                    <CircularProgress />
                </div>
            )
        }
        else {
            if(this.props.todos.length === 0) {
                todos = (
                    <div style={styles.center}>
                        <ActionInfoOutline style={ styles.iconNoItems } />
                        <div> No items </div>
                    </div>
                )
            }
            else {
                todos = (
                    <List>
                        {this.props.todos.map((item, index) => {
                            return <ListItem
                                      key={index}
                                      innerDivStyle={ item.checked ? styles.checkedItem : {}}
                                      leftCheckbox={<Checkbox checked={item.checked} onCheck={e => this.handleCheckItem(item.id)} />}
                                      primaryText={item.name}
                                      rightIconButton={
                                           <IconButton tooltip="Delete item" onClick={e => this.handleDeleteItem(item.id)}>
                                              <ActionDelete  />
                                            </IconButton>
                                          }
                                    />
                        })}
                    </List>
                )
            }
        }

        return todos;
    }

    render() {
        console.log('[Todo.js] render() -> props, state)', this.props, this.state)
        return (
            <div>
                <Card>
                    <CardText expandable={false}>
                        {this.renderTodos()}
                    </CardText>
                    <CardActions>
                      <RaisedButton label="Add" fullWidth={true} onClick={e => this.handleNewTodoOpen(e)}/>
                    </CardActions>
                 </Card>

                 <NewTodoModal open={this.state.openNewTodo} handleSave={item => {return this.handleNewTodoSave(item)}} handleClose={e => this.handleNewTodoClose(e)}  />
             </div>
        )
    }
}
