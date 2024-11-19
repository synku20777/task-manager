// src/App.tsx
import React, { useState } from "react";
import { Task } from "./types";
import TaskCard from "./components/TaskCard";
import AddTaskForm from "./components/AddTaskForm";
import { Button } from "./components/ui/button";
import "./index.css";

const App: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [showAddTask, setShowAddTask] = useState(false);
  const [editTaskId, setEditTaskId] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [sortDate, setSortDate] = useState<"asc" | "desc">("asc");
  const [sortPriority, setSortPriority] = useState<"asc" | "desc">("asc");

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

  const sortTasksByPriority = (tasks: Task[], sortPriority: "asc" | "desc") => {
    const priorityOrder = { low: 1, medium: 2, high: 3 };
    console.log(
      "Before Priority Sort:",
      tasks.map((t) => t.priority)
    ); // Debug
    const sorted = [...tasks].sort((a, b) => {
      const priorityA =
        priorityOrder[a.priority.toLowerCase() as keyof typeof priorityOrder] ||
        0;
      const priorityB =
        priorityOrder[b.priority.toLowerCase() as keyof typeof priorityOrder] ||
        0;
      return sortPriority === "asc"
        ? priorityA - priorityB
        : priorityB - priorityA;
    });
    console.log(
      "After Priority Sort:",
      sorted.map((t) => t.priority)
    ); // Debug
    return sorted;
  };

  const sortTasksByDeadline = (tasks: Task[], sortDate: "asc" | "desc") => {
    console.log(
      "Before Deadline Sort:",
      tasks.map((t) => t.deadline)
    ); // Debug
    const sorted = [...tasks].sort((a, b) => {
      const dateA = new Date(a.deadline);
      const dateB = new Date(b.deadline);
      return sortDate === "asc"
        ? dateA.getTime() - dateB.getTime()
        : dateB.getTime() - dateA.getTime();
    });
    console.log(
      "After Deadline Sort:",
      sorted.map((t) => t.deadline)
    ); // Debug
    return sorted;
  };

  const filteredTasks = selectedCategory
    ? tasks.filter((task) => task.category.includes(selectedCategory))
    : tasks;

  const sortedByPriority = sortTasksByPriority(filteredTasks, sortPriority);
  const sortedAndFilteredTasks = sortTasksByDeadline(
    sortedByPriority,
    sortDate
  );

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

      <div className="sort">
        {/* both sorts are activated together for some reason, pririty first and deadline second, so only the latest is shown */}
        <button
          className="sort-button"
          onClick={() =>
            setSortPriority(sortPriority === "asc" ? "desc" : "asc")
          }
        >
          {sortPriority === "asc"
            ? "Priority Descending"
            : "Priority Ascending"}
        </button>
        <button
          className="sort-button"
          onClick={() => setSortDate(sortDate === "asc" ? "desc" : "asc")}
        >
          {sortDate === "asc" ? "Deadline Descending" : "Deadline Ascending"}
        </button>
      </div>
      <div className={`task-list ${showAddTask ? "blurred" : ""}`}>
        {sortedAndFilteredTasks.map((task) => (
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

export default App;
