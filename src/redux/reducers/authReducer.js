// src/redux/reducers/authReducer.js
const initialState = {
  token: localStorage.getItem('token') || null,
  user: localStorage.getItem('user') || null,
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
      };
    case 'SET_USER':
      return {
        ...state,
        user: action.payload, // Store the user object
      };
    default:
      return state;
  }
};

export default authReducer;
