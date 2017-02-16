
// The reducer must initialize with an initial state
const defaultState = {
  items: [],
  fetching: false,
  fetched: false,
  error: null,
};

export default function reducer(state = defaultState, action) {
  switch (action.type) {
    case 'TODO_FETCH': {
      return {
        ...state,
        fetching: true,
      };
    }
    case 'TODO_FETCH_REJECTED': {
      return {
        ...state,
        fetching: false,
        error: action.payload,
      };
    }
    case 'TODO_FETCH_FULFILLED': {
      return {
        ...state,
        fetching: false,
        fetched: true,
        items: action.payload,
      };
    }
    case 'TODO_ADD': {
      return {
        ...state,
        items: [...state.items, action.payload],
      };
    }
    case 'TODO_UPDATE_CHECK': {
      const id = action.payload;
      const newTodos = [...state.items];
      const indexToUpdate = newTodos.findIndex(item => item.id === id);
      newTodos[indexToUpdate].checked = !newTodos[indexToUpdate].checked;

      return {
        ...state,
        items: newTodos,
      };
    }
    case 'TODO_UPDATE': {
      const { id } = action.payload;
      const newItems = [...state.items];
      const itemToUpdate = newItems.findIndex(item => item.id === id);
      newItems[itemToUpdate] = action.payload;

      return {
        ...state,
        items: newItems,
      };
    }
    case 'TODO_DELETE': {
      const id = action.payload;
      let newItems = [...state.items];

      // Remove using filter
      newItems = newItems.filter(item => item.id !== id);

      return {
        ...state,
        items: newItems,
      };
    }
    default: return state;
  }
}
