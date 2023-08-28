import React, { useState, useEffect } from "react";

const url = "https://playground.4geeks.com/apis/fake/todos/user/markoacm";

const InputTask = () => {
  const [task, setTask] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((response) => {
        setTask(response);
      })
      .catch((error) => console.log(error));
  }, []);

  const updateTasks = () => {
    const options = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(task),
    };

    fetch(url, options)
      .then((response) => response.json())
      .then((response) => console.log(response))
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    updateTasks();
  }, [task]);

  const addNewTask = () => {
    const newTask = { label: input, done: false };
    const newAddedTask = [...task];
    newAddedTask.push(newTask);
    setTask(newAddedTask);
    setInput("");
  };

  const handleChange = (event) => {
    setInput(event.target.value);
  };

  const handleClick = (index) => {
    setTask(task.filter((_, currentIndex) => currentIndex !== index));
  };

  const deleteTasks = () => {
    setTask([]);
    const options = {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    };
    fetch(`${url}/tasks`, options)
      .then((response) => {
        if (response.ok) {
          console.log("All tasks have been erased from API");
        } else {
          console.log("There was an error whith this request");
        }
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="task-input">
      <input
        type="text"
        id="new-task"
        name="new-task"
        placeholder="What needs to be done?"
        value={input}
        onChange={handleChange}
        onKeyDown={(event) => {
          if (event.key === "Enter") {
            if (input.trim() !== "") {
              addNewTask();
            }
          }
        }}
      />
      <ul>
        {task.map((item, index) => (
          <li key={index}>
            {item.label}
            <button
              className="btn delete"
              type="button"
              onClick={() => handleClick(index)}
            >
              X
            </button>
          </li>
        ))}
      </ul>
      <div className="items">{task.length} items</div>

      <button
        onClick={() => deleteTasks()}
        className="btn erase-tasks"
        type="button"
      >
        Delete all tasks
      </button>
    </div>
  );
};
export default InputTask;
