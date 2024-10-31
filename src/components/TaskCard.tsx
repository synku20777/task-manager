// src/components/TaskCard.tsx
import React from "react";
import { Task } from "../types";

interface Props {
  task: Task;
  onEdit: () => void;
  onDelete: (taskId: number) => void;
}

const priorityColors = {
  high: "red",
  medium: "orange",
  low: "yellow",
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
    <span className="deadline">Due: {task.deadline}</span>
    <div className="actions">
      <button onClick={onEdit}>✏️</button>
      <button onClick={() => onDelete(task.id)}>🗑️</button>
    </div>
  </div>
);

export default TaskCard;
