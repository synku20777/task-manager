// src/App.tsx
import React, { useState } from "react";
import { Task } from "./types";
import TaskCard from "./components/TaskCard";
import AddTaskForm from "./components/AddTaskForm";
import "./index.css";

const App: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [showAddTask, setShowAddTask] = useState(false);
  const [editTaskId, setEditTaskId] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState("");

  const handleAddTask = (newTask: Task) => {
    setTasks([...tasks, { ...newTask, id: Date.now() }]);
    setShowAddTask(false);
  };

  const handleEditTask = (updatedTask: Task) => {
    setTasks(
      tasks.map((task) => (task.id === updatedTask.id ? updatedTask : task))
    );
    setEditTaskId(null);
    setShowAddTask(false);
  };

  const handleDeleteTask = (taskId: number) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      setTasks(tasks.filter((task) => task.id !== taskId));
    }
  };

  const handleCategoryChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedCategory(event.target.value);
  };

  const filteredTasks = selectedCategory
    ? tasks.filter((task) => task.category.includes(selectedCategory))
    : tasks;

  return (
    <div className="app">
      <button
        className="add-button"
        onClick={() => setShowAddTask(!showAddTask)}
      >
        +
      </button>

      {showAddTask && (
        <AddTaskForm
          onSave={editTaskId ? handleEditTask : handleAddTask}
          task={tasks.find((task) => task.id === editTaskId) || null}
          onCancel={() => {
            setShowAddTask(false);
            setEditTaskId(null);
          }}
        />
      )}

      <div className="filter">
        <label htmlFor="category">Filter by category:</label>
        <select
          id="category"
          value={selectedCategory}
          onChange={handleCategoryChange}
        >
          <option value="">All</option>
          <option value="work">Work</option>
          <option value="personal">Personal</option>
          <option value="other">Other</option>
        </select>
      </div>

      <div className={`task-list ${showAddTask ? "blurred" : ""}`}>
        {filteredTasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onEdit={() => {
              setEditTaskId(task.id);
              setShowAddTask(true);
            }}
            onDelete={handleDeleteTask}
          />
        ))}
      </div>
    </div>
  );
};

// export { tasks };
export default App;
