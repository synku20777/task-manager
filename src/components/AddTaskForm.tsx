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
  const [deadline, setDeadline] = useState<Date | null>(task?.deadline || null);
  const [priority, setPriority] = useState<1 | 2 | 3>(task?.priority || 3);

  const priorityOptions = [
    { value: 3, label: "Low" },
    { value: 2, label: "Medium" },
    { value: 1, label: "High" },
  ];

  const priorityLabel =
    priorityOptions.find((option) => option.value === priority)?.label || "Low";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim() && deadline) {
      onSave({
        id: task?.id || Date.now(),
        title,
        category,
        description,
        deadline: deadline as Date,
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
                newCategory[index] = e.target.value.toLowerCase();
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
          value={deadline ? deadline.toISOString().split("T")[0] : ""}
          onChange={(e) => setDeadline(new Date(e.target.value))}
          required
        />
        <label htmlFor="priority">Priority</label>
        <select
          id="priority"
          value={priorityLabel}
          onChange={(e) => {
            const selectedPriority = priorityOptions.find(
              (option) => option.label === e.target.value
            )?.value;
            if (selectedPriority !== undefined) {
              setPriority(selectedPriority as 1 | 2 | 3);
            }
          }}
        >
          {priorityOptions.map((option) => (
            <option key={option.value} value={option.label}>
              {option.label}
            </option>
          ))}
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
