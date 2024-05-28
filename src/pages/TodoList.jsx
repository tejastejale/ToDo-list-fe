import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  Card,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
import DoneIcon from "@mui/icons-material/Done";
import DeleteIcon from "@mui/icons-material/Delete";

const url = "https://technical-brittaney-sitrc-bdf3a6c7.koyeb.app";
const TodoList = () => {
  const token = useSelector((state) => state.auth.token);
  const [todoList, setTodoList] = useState([]);
  const [filter, setFilter] = useState("all");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTaskName, setNewTaskName] = useState("");
  const [newTaskDone, setNewTaskDone] = useState(false);
  const [charCount, setCharCount] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${url}/api/todo`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error('Failed to fetch');
        }
        const data = await response.json();
        setTodoList(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    if (token) {
      fetchData();
    }
  }, [token]);

  const user = useSelector((state) => state.auth.user);

  const completed = todoList.filter((todo) => todo.done).length;
  const inCompleted = todoList.filter((todo) => !todo.done).length;
  let filteredList = [];
  if (filter === "all") {
    filteredList = todoList;
  } else if (filter === "incomplete") {
    filteredList = todoList.filter((todo) => !todo.done);
  } else if (filter === "complete") {
    filteredList = todoList.filter((todo) => todo.done);
  }
  const handleTaskNameChange = (e) => {
    setNewTaskName(e.target.value);
    setCharCount(e.target.value.length);
  };
  
  const handleDelete = async (id) => {
    try {
      const response = await fetch(`${url}/api/todo/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error('Failed to delete');
      }
      setTodoList(todoList.filter((todo) => todo.id !== id));
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  const handleModify = async (id, updatedTask, updatedDone) => {
    try {
      const response = await fetch(`${url}/api/todo/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          task: updatedTask,
          done: updatedDone,
        }),
      });
      if (!response.ok) {
        throw new Error('Failed to modify');
      }
      setTodoList(
        todoList.map((todo) => {
          if (todo.id === id) {
            return {
              ...todo,
              task: updatedTask,
              done: updatedDone,
            };
          }
          return todo;
        })
      );
    } catch (error) {
      console.error("Error modifying todo:", error);
    }
  };

  const handleAddTask = async () => {
    try {
      const response = await fetch(`${url}/api/todo`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          task: newTaskName,
          done: newTaskDone,
        }),
      });
      if (!response.ok) {
        throw new Error('Failed to add');
      }
      const newTodo = await response.json();
      setTodoList([...todoList, newTodo]);
      setNewTaskName("");
      setNewTaskDone(false);
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error adding todo:", error);
    }
  };

  return (
    <div className="flex w-full h-[100vh] bg-gray-900">
      <div className="container mx-auto mt-8 bg-gray-900 text-white">
        <h1 className="text-3xl font-bold mb-8 text-center">Hey, {user}!</h1>
        <div className="flex flex-row justify-center gap-10">
          <div
            className="p-4 bg-gray-800 rounded-lg w-56 cursor-pointer"
            onClick={() => setIsModalOpen(true)}
          >
            <h2 className="text-md font-semibold">Create Task</h2>
            <p className="text-9xl text-center font-bold">+</p>
          </div>

          <div className="p-4 bg-gray-800 rounded-lg w-56">
            <h2 className="text-lg font-semibold">Total Tasks</h2>
            <p className="text-9xl text-center font-bold">{todoList.length}</p>
          </div>

          <div className="p-4 bg-gray-800 rounded-lg w-56">
            <h2 className="text-lg font-semibold">Remaining Tasks</h2>
            <p className="text-9xl text-center font-bold">{inCompleted}</p>
          </div>

          <div className="p-4 bg-gray-800 rounded-lg w-56">
            <h2 className="text-lg font-semibold">Completed Tasks</h2>
            <p className="text-9xl text-center font-bold">{completed}</p>
          </div>

          <div className="bg-gray-800 w-56 p-4 rounded-lg">
            <svg className="w-full h-full" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="40"
                fill="none"
                stroke="#333"
                strokeWidth="10"
              />
              <circle
                cx="50"
                cy="50"
                r="40"
                fill="none"
                stroke="#4CAF50"
                strokeWidth="10"
                strokeDasharray={`${(completed / todoList.length) * 251} 251`}
                strokeDashoffset="0"
                strokeLinecap="round"
                transform="rotate(-90 50 50)"
              />
              <text
                x="50"
                y="55"
                textAnchor="middle"
                fontSize="20"
                fill="#FFFFFF"
              >
                {`${
                  completed === 0
                    ? "0"
                    : Math.round((completed / todoList.length) * 100)
                }%`}
              </text>
            </svg>
          </div>
        </div>
        <div className="container mx-auto mt-8 p-3 bg-gray-900">
          <h1 className="text-2xl font-bold mb-4">Todo List</h1>
          <div className="flex justify-center mb-4">
            <button
              className={`mr-4 px-4 py-2 rounded-full ${
                filter === "all"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-800 text-gray-200"
              }`}
              onClick={() => setFilter("all")}
            >
              All
            </button>
            <button
              className={`mr-4 px-4 py-2 rounded-full ${
                filter === "incomplete"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-800 text-gray-200"
              }`}
              onClick={() => setFilter("incomplete")}
            >
              Incomplete
            </button>
            <button
              className={`px-4 py-2 rounded-full ${
                filter === "complete"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-800 text-gray-200"
              }`}
              onClick={() => setFilter("complete")}
            >
              Complete
            </button>
          </div>
          <div className="w-full gap-10 h-32 grid grid-cols-4">
            {filteredList.map((todo) => (
              <div
                key={todo.id}
                className={`rounded-md mb-4 h-32 max-h-32 w-80 text-white`}
              >
                <div
                  className={`${
                    todo.done ? "border-green-500" : "border-red-500"
                  } border-[1px] rounded-xl bg-gray-600`}
                >
                  <Card className="w-[19.7rem] bg-gray-800 shadow-md text-white h-28">
                    <CardBody>
                      <Typography
                        variant="h6"
                        color="white"
                        className="mb-2 overflow-auto"
                      >
                        {todo.task}
                      </Typography>
                    </CardBody>
                    <CardFooter className="pt-0 align-bottom"></CardFooter>
                  </Card>
                  <div className="flex flex-row justify-between pt-2 w-full px-3 pb-2">
                    <Button
                      onClick={() =>
                        handleModify(todo.id, todo.task, !todo.done)
                      }
                      className="justify-start bg-green-500 px-4 py-2"
                    >
                      <DoneIcon />
                    </Button>
                    <Button
                      onClick={() => handleDelete(todo.id)}
                      className="justify-end px-4 py-2 bg-red-500"
                    >
                      <DeleteIcon />
                    </Button>
                  </div>
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
                <input
                  type="text"
                  className="w-full border border-gray-300 p-2 mb-2"
                  placeholder="Task Name"
                  value={newTaskName}
                  maxLength={100}
                  onChange={handleTaskNameChange}
                />
                      <p className="text-right text-sm text-gray-500">{charCount}/100 characters</p>

                <div className="flex items-center mb-2">
                  <input
                    type="checkbox"
                    className="mr-2"
                    checked={newTaskDone}
                    onChange={(e) => setNewTaskDone(e.target.checked)}
                  />
                  <label className="text-sm">Done</label>
                </div>
                <div className="flex justify-end">
                  <button
                    className="px-4 py-2 bg-blue-500 text-white rounded-md mr-2"
                    onClick={handleAddTask}
                  >
                    Add
                  </button>
                  <button
                    className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md"
                    onClick={() => setIsModalOpen(false)}
                  >
                    Cancel
                  </button>
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
