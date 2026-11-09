import { useState } from "react";

import "./App.css";

function App() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);
  const [message, setMessage] = useState("");
  const [filter, setFilter] = useState("all");
  function toggleComplete(id) {
    const updatedTasks = tasks.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          completed: !item.completed,
        };
      }

      return item;
    });

    setTasks(updatedTasks);
  }
  function addTodo() {
    if (task.trim() === "") {
      setMessage("Please enter a task");
      return;
    }
    const newTodo = {
      id: crypto.randomUUID(),
      text: task.trim(),
      completed: false,
    };
    setTasks([...tasks, newTodo]);
    setTask("");
    setMessage("");
  }
  function deleteTodo(idtodlt) {
    const newTasks = tasks.filter((item) => item.id !== idtodlt);
    setTasks(newTasks);
  }
  const filteredTasks = tasks.filter((item) => {
    if (filter === "completed") {
      return item.completed === true;
    }

    if (filter === "pending") {
      return item.completed === false;
    }

    return true;
  });
  return (
    <div>
      <h3>Total Tasks: {tasks.length}</h3>

      <h3>
        Completed Tasks:{" "}
        {tasks.filter((item) => item.completed === true).length}
      </h3>

      <h3>
        Pending Tasks: {tasks.filter((item) => item.completed === false).length}
      </h3>
      <h1>My todo List</h1>
      <input
        type="text"
        placeholder="Enter task"
        value={task}
        onChange={(e) => setTask(e.target.value)}
      />

      <button onClick={addTodo}>Add</button>
      <button onClick={() => setFilter("all")}>All</button>
      <button onClick={() => setFilter("completed")}>Completed</button>
      <button onClick={() => setFilter("pending")}>Pending</button>
      {filteredTasks.map((item) => (
        <div key={item.id}>
          <input
            type="checkbox"
            checked={item.completed}
            onChange={() => toggleComplete(item.id)}
          />
          <span
            style={{
              textDecoration: item.completed ? "line-through" : "none",
            }}
          >
            {item.text}
          </span>
          <button onClick={() => deleteTodo(item.id)}>Delete</button>
        </div>
      ))}
      <p>{message}</p>
    </div>
  );
}

export default App;
