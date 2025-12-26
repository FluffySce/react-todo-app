import { useState } from "react";

const App = () => {
  const savedTask = localStorage.getItem("tasks");
  const initialTasks = savedTask ? JSON.parse(savedTask) : [];
  const [task, setTask] = useState("");
  const [allTasks, setAllTasks] = useState(initialTasks);

  const submitTask = (e) => {
    e.preventDefault();
    if (task.trim() === "") return;
    const updatedTasks = allTasks.concat({
      id: Date.now(),
      task,
      completed: false,
    });
    setAllTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    setTask("");
  };
  const toggleTask = (id) => {
    const updatedTasks = allTasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    setAllTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  return (
    <div>
      <ul>
        {allTasks.map((task) => (
          <li
            key={task.id}
            onClick={() => toggleTask(task.id)}
            style={{
              textDecoration: task.completed ? "line-through" : "none",
              cursor: "pointer",
            }}
          >
            {task.task}
          </li>
        ))}
      </ul>
      <form onSubmit={submitTask}>
        <input
          name="task"
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />
        <button type="submit">enter task</button>
      </form>
    </div>
  );
};

export default App;
