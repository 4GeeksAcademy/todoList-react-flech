import React, { useEffect, useState } from "react";

function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  function fetchTasks() {
    fetch("https://playground.4geeks.com/todo/users/cristhian123")
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        setTasks(data.todos);
      })
      .catch(function (error) {
        console.log("Error:", error);
      });
  }

  useEffect(function () {
    fetchTasks();
  }, []);

  function addTask() {
    if (newTask.trim() === "") return;

    const taskObject = {
      label: newTask,
      done: false
    };

    fetch("https://playground.4geeks.com/todo/todos/cristhian123", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(taskObject)
    })
      .then(function (res) {
        return res.json();
      })
      .then(function (data) {
        console.log("Task added:", data);
        setNewTask("");
        fetchTasks();
      })
      .catch(function (error) {
        console.log("Error adding task:", error);
      });
  }

  function deleteTask(taskId) {
    fetch("https://playground.4geeks.com/todo/todos/cristhian123/" + taskId, {
      method: "DELETE"
    })
      .then(function (res) {
        return res.json();
      })
      .then(function (data) {
        console.log("Task deleted:", data);
        fetchTasks();
      })
      .catch(function (error) {
        console.log("Error deleting task:", error);
      });
  }

  function clearAllTasks() {
    fetch("https://playground.4geeks.com/todo/users/cristhian123", {
      method: "DELETE"
    })
      .then(function (res) {
        return res.json();
      })
      .then(function (data) {
        console.log("All tasks cleared:", data);
        fetchTasks();
      })
      .catch(function (error) {
        console.log("Error clearing tasks:", error);
      });
  }

  return (
  <div style={{
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "100vh"
  }}>
    <h1>Task List</h1>

    <div>
      <input
        type="text"
        value={newTask}
        onChange={function (e) {
          setNewTask(e.target.value);
        }}
        placeholder="Write a task"
      />
      <button onClick={addTask}>Add Task</button>
      <button onClick={clearAllTasks}>Clear All Tasks</button>
    </div>

    <ul>
      {tasks.map(function (task, index) {
        return (
          <li key={index}>
            {task.label}{" "}
            <button onClick={function () { deleteTask(task.id); }}>
              Delete
            </button>
          </li>
        );
      })}
    </ul>
  </div>
);
}

export default TaskList;