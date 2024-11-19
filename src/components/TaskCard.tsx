// src/components/TaskCard.tsx
import React from "react";
import { Task } from "../types";

interface Props {
  task: Task;
  onEdit: () => void;
  onDelete: (taskId: number) => void;
}

const beforeDeadline = (deadline: Date): string => {
  const now = new Date();
  const diffMs = deadline.getTime() - now.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  return diffDays >= 0 ? `${diffDays} days` : "overdue";
};

const priorityColors = {
  high: "#f5003e",
  medium: "#f3c600",
  low: "#00a837",
};

const TaskCard: React.FC<Props> = ({ task, onEdit, onDelete }) => (
  <div
    className="task-card"
    style={{ borderLeftColor: priorityColors[task.priority] }}
  >
    <h2>{task.title}</h2>
    {task.category.map((category, index) => (
      <div key={index} className="category">
        <h4>{category} </h4>
      </div>
    ))}
    <br />
    <span className="priority">{task.priority.toUpperCase()}</span>
    <p>{task.description}</p>
    <span className="deadline">Due in: {beforeDeadline(task.deadline)}</span>
    <div className="actions">
      <button onClick={onEdit}>✏️</button>
      <button onClick={() => onDelete(task.id)}>🗑️</button>
    </div>
  </div>
);

export default TaskCard;
