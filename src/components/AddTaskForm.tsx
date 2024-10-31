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
  const [category, setCategory] = useState<string[]>(task?.category || []);
  const [description, setDescription] = useState(task?.description || "");
  const [deadline, setDeadline] = useState(task?.deadline || "");
  const [priority, setPriority] = useState(task?.priority || "low");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim() && deadline) {
      onSave({
        id: task?.id || Date.now(),
        title,
        category,
        description,
        deadline,
        priority,
      });
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
        <div>
          {category.map((cat, index) => (
            <input
              key={index}
              type="text"
              placeholder={`Category ${index + 1}`}
              value={cat}
              onChange={(e) => {
                const newCategory = [...category];
                newCategory[index] = e.target.value;
                setCategory(newCategory);
              }}
              required
            />
          ))}
          <button type="button" onClick={() => setCategory([...category, ""])}>
            + Add Category
          </button>
        </div>
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <label htmlFor="deadline">Deadline</label>
        <input
          id="deadline"
          type="date"
          value={deadline}
          onChange={(e) => setDeadline(e.target.value)}
          required
        />
        <label htmlFor="priority">Priority</label>
        <select
          id="priority"
          value={priority}
          onChange={(e) =>
            setPriority(e.target.value as "low" | "medium" | "high")
          }
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
        <button type="submit">{task ? "Save Changes" : "Add Task"}</button>
        <button type="button" onClick={onCancel}>
          Cancel
        </button>
      </form>
    </div>
  );
};

export default AddTaskForm;
export const getCategoryArray = (categoryString: string): string[] => {
  return categoryString.split(",").map((cat) => cat.trim());
};
