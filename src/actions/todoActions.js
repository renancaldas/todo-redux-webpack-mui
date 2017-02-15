//import axios from 'axios';

// Is possible to import more actions, like:
// import * as user from "../userActions"
// or import { setUserName } from "../userActions"
// user.setUserName("Renan")

const makeId = () => {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for( var i=0; i < 5; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}

export function fetchTodos() {
    return function(dispach) {
        dispach({ type: 'TODO_FETCH'})

        // Simulating a request
        setTimeout(() => {
            dispach({
                type: 'TODO_FETCH_FULFILLED',
                payload: [{id: makeId(), name: 'Wash the dishes', checked: true}]
            })
        }, 2000)
    }
}

export function checkTodo(id) {
    return {
        type: 'TODO_UPDATE_CHECK',
        payload: id
    }
}

export function addTodo(name) {
    // Assign a new id and checked false
    const todo = {
        id: makeId(),
        name: name,
        checked: false
    }

    return {
        type: 'TODO_ADD',
        payload: todo
    }
}

export function deleteTodo(id) {
    return {
        type: 'TODO_DELETE',
        payload: id
    }
}
