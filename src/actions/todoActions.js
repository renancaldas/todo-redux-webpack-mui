// Is possible to import more actions, like:
// import * as user from "../userActions"
// or import { setUserName } from "../userActions"
// user.setUserName("Renan")

const makeId = () => {
  let text = '';
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (let i = 0; i < 5; i += 1) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }

  return text;
};

export function fetchTodos() {
  return function fetch(dispach) {
    dispach({ type: 'TODO_FETCH' });

    // Simulating a request
    setTimeout(() => {
      dispach({
        type: 'TODO_FETCH_FULFILLED',
        payload: [{ id: makeId(), name: 'Wash the dishes', checked: true }],
      });
    }, 2000);
  };
}

export function checkTodo(id) {
  return {
    type: 'TODO_UPDATE_CHECK',
    payload: id,
  };
}

export function addTodo(name) {
  // Assign a new id and checked false
  const todo = {
    id: makeId(),
    name,
    checked: false,
  };

  return {
    type: 'TODO_ADD',
    payload: todo,
  };
}

export function deleteTodo(id) {
  return {
    type: 'TODO_DELETE',
    payload: id,
  };
}
