// src/App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { ToastProvider } from "react-toast-notifications";
import { Provider } from "react-redux";
import store from "./redux/store.js";
import TodoList from "./pages/TodoList.jsx";

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <Router>
          <ToastProvider>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/home" element={<TodoList />} />
            </Routes>
          </ToastProvider>
        </Router>
      </Provider>
    </div>
  );
}

export default App;
