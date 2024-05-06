import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const url = "https://technical-brittaney-sitrc-bdf3a6c7.koyeb.app";
const TodoList = () => {
  const token = useSelector(state => state.auth.token);
  const [todoList, setTodoList] = useState([]);
  const [filter, setFilter] = useState('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTaskName, setNewTaskName] = useState('');
  const [newTaskDone, setNewTaskDone] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${url}/api/todo`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });
        const data = await response.json();
        setTodoList(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, [token]);

  const user = useSelector(state => state.auth.user);

  // Count completed and incomplete tasks based on the filter
  const completed = todoList.filter(todo => todo.done).length;
  const inCompleted = todoList.filter(todo => !todo.done).length;
  let filteredList = [];
  if (filter === 'all') {
    filteredList = todoList;
  } else if (filter === 'incomplete') {
    filteredList = todoList.filter(todo => !todo.done);
  } else if (filter === 'complete') {
    filteredList = todoList.filter(todo => todo.done);
  }

  // Delete a todo item
  const handleDelete = async (id) => {
    try {
      await fetch(`${url}/api/todo/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      // Remove the deleted todo item from the list
      setTodoList(todoList.filter(todo => todo.id !== id));
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  // Modify a todo item
  const handleModify = async (id, updatedTask, updatedDone) => {
    try {
      await fetch(`${url}/api/todo/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          task: updatedTask,
          done: updatedDone
        })
      });
      // Update the todo list after modification
      setTodoList(todoList.map(todo => {
        if (todo.id === id) {
          return {
            ...todo,
            task: updatedTask,
            done: updatedDone
          };
        }
        return todo;
      }));
    } catch (error) {
      console.error('Error modifying todo:', error);
    }
  };

  // Add a new todo item
  const handleAddTask = async () => {
    try {
      const response = await fetch(`${url}/api/todo`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          task: newTaskName,
          done: newTaskDone
        })
      });
      const newTodo = await response.json();
      setTodoList([...todoList, newTodo]);
      // Reset modal fields
      setNewTaskName('');
      setNewTaskDone(false);
      // Close the modal
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error adding todo:', error);
    }
  };

  return (
    <div className='flex w-full h-[100vh] bg-gray-900 '>
      <div className='container mx-auto mt-8 bg-gray-900 text-white'>
        <h1 className='text-3xl font-bold mb-8 text-center'>Hey, {user}!</h1>
        <div className='flex flex-row justify-center gap-10 '>
          {/* Create Task Card */}
          <div className='p-4 bg-gray-800 rounded-lg w-56' onClick={() => setIsModalOpen(true)}>
            <h2 className='text-md font-semibold'>Create Task</h2>
            <p className='text-9xl text-center font-bold'>+</p>
          </div>

          {/* Total Tasks Card */}
          <div className='p-4 bg-gray-800 rounded-lg w-56'>
            <h2 className='text-lg font-semibold'>Total Tasks</h2>
            <p className='text-9xl text-center font-bold'>{todoList.length}</p>
          </div>

          {/* Remaining Tasks Card */}
          <div className='p-4 bg-gray-800 rounded-lg w-56'>
            <h2 className='text-lg font-semibold'>Remaining Tasks</h2>
            <p className='text-9xl text-center font-bold'>{inCompleted}</p>
          </div>

          {/* Completed Tasks Card */}
          <div className='p-4 bg-gray-800 rounded-lg w-56'>
            <h2 className='text-lg font-semibold'>Completed Tasks</h2>
            <p className='text-9xl text-center font-bold'>{completed}</p>
          </div>

          {/* Graph of Completed Tasks */}
          <div className='bg-gray-800 w-56 p-4 rounded-lg'>
            <svg className='w-full h-full' viewBox='0 0 100 100'>
              {/* Background Circle */}
              <circle cx='50' cy='50' r='40' fill='none' stroke='#333' strokeWidth='10' />
              {/* Completed Circle */}
              <circle
                cx='50'
                cy='50'
                r='40'
                fill='none'
                stroke='#4CAF50' // Dark green color
                strokeWidth='10'
                strokeDasharray={`calc(${completed / todoList.length * 100}% ${100 - completed / todoList.length * 100}%)`}
                strokeDashoffset='25'
                strokeLinecap='round'
                transform='rotate(-90 50 50)'
              />
              {/* Percentage Label */}
              <text x='50' y='55' textAnchor='middle' fontSize='20' fill='#FFFFFF'>
                {`${Math.round((completed / todoList.length) * 100)}%`}
              </text>
            </svg>
          </div>
        </div>
        <div className='container mx-auto mt-8 p-3 bg-gray-900'>
          <h1 className='text-2xl font-bold mb-4'>Todo List</h1>
          {/* Filter Buttons */}
          <div className='flex justify-center mb-4'>
            <button className={`mr-4 px-4 py-2 rounded-full ${filter === 'all' ? 'bg-blue-500 text-white' : 'bg-gray-800 text-gray-200'}`} onClick={() => setFilter('all')}>All</button>
            <button className={`mr-4 px-4 py-2 rounded-full ${filter === 'incomplete' ? 'bg-blue-500 text-white' : 'bg-gray-800 text-gray-200'}`} onClick={() => setFilter('incomplete')}>Incomplete</button>
            <button className={`px-4 py-2 rounded-full ${filter === 'complete' ? 'bg-blue-500 text-white' : 'bg-gray-800 text-gray-200'}`} onClick={() => setFilter('complete')}>Complete</button>
          </div>
          {/* Todo List */}
          <div className=' bg-gray-900'>
            {filteredList.map(todo => (
              <div key={todo.id} className={`p-4 bg-gray-800 rounded-lg mb-4 ${todo.done ? 'text-green-500' : 'text-red-500'}`}>
                <p>{todo.task}</p>
                <div className="flex justify-between mt-2">
                  <button className="px-3 py-1 bg-blue-500 text-white rounded-md" onClick={() => handleModify(todo.id, todo.task, !todo.done)}>
                    Modify
                  </button>
                  <button className="px-3 py-1 bg-red-500 text-white rounded-md" onClick={() => handleDelete(todo.id)}>
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {isModalOpen && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen">
            <div className="bg-white rounded-lg w-1/2">
              <div className="p-4">
                <h2 className="text-lg font-semibold mb-4">Add New Task</h2>
                <input type="text" className="w-full border border-gray-300 p-2 mb-2" placeholder="Task Name" value={newTaskName} onChange={(e) => setNewTaskName(e.target.value)} />
                <div className="flex items-center mb-2">
                  <input type="checkbox" className="mr-2" checked={newTaskDone} onChange={(e) => setNewTaskDone(e.target.checked)} />
                  <label className="text-sm">Done</label>
                </div>
                <div className="flex justify-end">
                  <button className="px-4 py-2 bg-blue-500 text-white rounded-md mr-2" onClick={handleAddTask}>Add</button>
                  <button className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md" onClick={() => setIsModalOpen(false)}>Cancel</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TodoList;
