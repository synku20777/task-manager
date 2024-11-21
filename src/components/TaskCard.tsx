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
  1: "#f5003e",
  2: "#f3c600",
  3: "#00a837",
};

const TaskCard: React.FC<Props> = ({ task, onEdit, onDelete }) => (
  <div
    className="task-card"
    style={{ borderLeftColor: priorityColors[task.priority] }}
  >
    <h2>{task.id}</h2>
    <h2>{task.title}</h2>
    <div className="category">
      {task.category.join(", ")}
    </div>
    <span className="priority">
      {task.priority === 1 ? "High" : task.priority === 2 ? "Medium" : "Low"}
    </span>
    <p>{task.description}</p>
    <span className="deadline">Due in: {beforeDeadline(task.deadline)}</span>
    <span className="status">{task.state}</span>
    <div className="actions">
      <button id="edit-task" className="edit" onClick={onEdit}>
        ✏️
      </button>
      <button
        id="delete-task"
        className="destroy"
        onClick={() => onDelete(task.id)}
      >
        🗑️
      </button>
    </div>
  </div>
);


export default TaskCard;
