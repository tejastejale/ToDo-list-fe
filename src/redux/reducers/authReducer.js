const initialState = {
  token: localStorage.getItem('token') || null,
  user: localStorage.getItem('user') || null,
  // todoList: localStorage.getItem('todo') || JSON.parse(localStorage.getItem('todo')) || null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        token: action.payload,
      };
    case 'LOGOUT':
      return {
        ...state,
        token: null,
        user: null,
        todoList: null, 
      };
    case 'SET_USER':
      return {
        ...state,
        user: action.payload, // Store the user object
      };
    case 'SET_TODO_LIST':
      return {
        ...state,
        todoList: action.payload, // Store the todo list
      };
    default:
      return state;
  }
};

export default authReducer;
