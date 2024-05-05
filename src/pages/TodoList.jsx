// src/pages/TodoList.js
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUserAndTodoList } from '../redux/actions/authActions';

const TodoList = () => {
  const user = useSelector(state => state.auth.user);
  const dispatch = useDispatch();


  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-2xl font-bold mb-4">Hey, {user}!</h1>
    </div>
  );
};

export default TodoList;
