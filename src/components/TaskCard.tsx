import React from "react";
import { Task } from "../types";
import { CircleIcon, IssueClosedIcon } from "@primer/octicons-react";

interface Props {
  task: Task;
  onEdit: () => void;
  onDelete: (taskId: number) => void;
  onStateChange: (taskId: number, newState: "active" | "completed") => void;
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

const stateIcons = {
  active: <CircleIcon />,
  completed: <IssueClosedIcon />,
};

const TaskCard: React.FC<Props> = ({
  task,
  onEdit,
  onDelete,
  onStateChange,
}) => {
  const changeTaskState = (
    event: React.MouseEvent<HTMLSpanElement, MouseEvent>
  ) => {
    const newState = task.state === "active" ? "completed" : "active";
    onStateChange(task.id, newState);
  };

  return (
    <div
      className="task-card"
      style={{ borderLeftColor: priorityColors[task.priority] }}
    >
      {/* <h2>{task.id}</h2> */}
      <span className="status" onClick={changeTaskState}>
        {stateIcons[task.state]}
      </span>
      <h2>{task.title}</h2>
      <div className="category">{task.category.join(", ")}</div>
      <span className="priority">
        {task.priority === 1 ? "High" : task.priority === 2 ? "Medium" : "Low"}
      </span>
      <span className="deadline">Due in: {beforeDeadline(task.deadline)}</span>
      <p>{task.description}</p>
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
};

export default TaskCard;
