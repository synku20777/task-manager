// src/components/AddTaskForm.tsx
import React, { useState } from "react";
import { Task } from "../types";

interface Props {
  onSave: (task: Task) => void;
  task: Task | null;
  onCancel: () => void;
}

const AddTaskForm: React.FC<Props> = ({ onSave, task, onCancel }) => {
  const [title, setTitle] = useState(task?.title || "");
  const [description, setDescription] = useState(task?.description || "");
  const [deadline, setDeadline] = useState(task?.deadline || "");
  const [priority, setPriority] = useState(task?.priority || "low");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim() && deadline) {
      onSave({ id: task?.id || Date.now(), title, description, deadline, priority });
    }
  };

  return (
    <div className="overlay">
      <form className="task-form" onSubmit={handleSubmit}>
        <h3>{task ? "Edit Task" : "Add Task"}</h3>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          type="date"
          value={deadline}
          onChange={(e) => setDeadline(e.target.value)}
          required
        />
        <select value={priority} onChange={(e) => setPriority(e.target.value)}>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
        <button type="submit">{task ? "Save Changes" : "Add Task"}</button>
        <button type="button" onClick={onCancel}>Cancel</button>
      </form>
    </div>
  );
};

export default AddTaskForm;
