// src/redux/actions/authActions.js
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const SET_USER = 'SET_USER';
export const SET_TODO_LIST = 'SET_TODO_LIST';


const url = "https://technical-brittaney-sitrc-bdf3a6c7.koyeb.app";

export const loginSuccess = (token) => {
  localStorage.setItem('token', token);
  return {
    type: LOGIN_SUCCESS,
    payload: token,
  };
};

export const setUser = (user) => {
  localStorage.setItem('user', user);
  return{
    type: SET_USER,
    payload: user,
  };
};

export const setTodoList = (todoList) => {
  localStorage.setItem('todo',todoList);
  return{
    type: SET_TODO_LIST,
    payload: todoList,
  };
};

export const fetchUserAndTodoList = () => async (dispatch, getState) => {
  const state = getState();
  const token = state.auth.token;

  try {
    // Fetch user info
    // const userResponse = await fetch('https://todo-list-fast-api.onrender.com/api/auth/user', {
    //   method: 'GET',
    //   headers: {
    //     'Authorization': `Bearer ${token}`
    //   }
    // });
    // const userData = await userResponse.json();

    // Fetch todo list
    const todoListResponse = await fetch(`${url}/api/todo/`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    const todoListData = await todoListResponse.json();

    dispatch(setTodoList(todoListData));
  } catch (error) {
    console.error('Error:', error);
    // Handle error here, show toast or dispatch an action
  }
};
