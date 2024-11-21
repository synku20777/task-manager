import React, { MouseEventHandler, useCallback, useState } from "react";
import { Task } from "./types";
import TaskCard from "./components/TaskCard";
import AddTaskForm from "./components/AddTaskForm";
import {
  ChevronDownIcon,
  ChevronUpIcon,
  DiffAddedIcon,
  CircleIcon,
  IssueClosedIcon,
} from "@primer/octicons-react";
import "./index.css";

type SortKeys = keyof Task;
type SortOrder = "asc" | "desc";

function sortData({
  tableData,
  sortKey,
  reverse,
}: {
  tableData: Task[];
  sortKey: SortKeys;
  reverse: boolean;
}) {
  if (!sortKey) return tableData;

  const sortedData = tableData.sort((a, b) => {
    if (sortKey === "state") {
      // Custom sorting for state: active tasks first, completed tasks last
      if (a.state === "active" && b.state === "completed") return -1;
      if (a.state === "completed" && b.state === "active") return 1;
      return 0;
    }

    if (a[sortKey] > b[sortKey]) return 1;
    if (a[sortKey] < b[sortKey]) return -1;
    return 0;
  });

  if (reverse) {
    return sortedData.reverse();
  }

  return sortedData;
}

const App: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: 1,
      title: "Task 1",
      priority: 1,
      deadline: new Date("2024-11-25"),
      category: ["work"],
      description: "Description for Task 1",
      state: "completed",
    },
    {
      id: 2,
      title: "Task 2",
      priority: 3,
      deadline: new Date("2024-11-22"),
      category: ["personal"],
      description: "Description for Task 2",
      state: "completed",
    },
    {
      id: 3,
      title: "Task 3",
      priority: 2,
      deadline: new Date("2024-11-30"),
      category: ["other"],
      description: "Description for Task 3",
      state: "active",
    },
    {
      title: "Task 4",
      priority: 3,
      deadline: new Date("2024-11-30"),
      category: ["work"],
      description: "Description for Task 4",
      id: 4,
      state: "active",
    },
    {
      title: "Task 5",
      priority: 1,
      deadline: new Date("2024-11-30"),
      category: ["personal"],
      description: "Description for Task 5",
      id: 5,
      state: "active",
    },
  ]);

  const [showAddTask, setShowAddTask] = useState(false);
  const [editTaskId, setEditTaskId] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [sortKey, setSortKey] = useState<SortKeys>("deadline");
  const [sortOrders, setSortOrders] = useState<Record<SortKeys, SortOrder>>({
    id: "asc",
    state: "asc",
    title: "asc",
    category: "asc",
    priority: "asc",
    deadline: "asc",
    description: "asc",
  });

  const headers: { key: SortKeys; label: string }[] = [
    { key: "state", label: "State" }, // Add state to headers
    { key: "title", label: "Title" },
    { key: "category", label: "Category" },
    { key: "priority", label: "Priority" },
    { key: "deadline", label: "Deadline" },
  ];

  function SortButton({
    sortOrder,
    columnKey,
    sortKey,
    onClick,
    label,
  }: {
    sortOrder: SortOrder;
    columnKey: SortKeys;
    sortKey: SortKeys;
    onClick: MouseEventHandler<HTMLButtonElement>;
    label: string;
  }) {
    return (
      <button
        type="button"
        onClick={onClick}
        className={`${
          sortKey === columnKey && sortOrder === "desc"
            ? "sort-button sort-reverse"
            : "sort-button"
        } `}
      >
        {label}
        {sortOrder === "asc" ? (
          <>
            <ChevronUpIcon />
          </>
        ) : (
          <>
            <ChevronDownIcon />
          </>
        )}
      </button>
    );
  }

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

  const handleStateChange = (
    taskId: number,
    newState: "active" | "completed"
  ) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, state: newState } : task
      )
    );
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

  function changeSort(key: SortKeys) {
    setSortOrders((prev) => {
      const newSortOrders = { ...prev };
      for (const k in newSortOrders) {
        if (k !== key) {
          newSortOrders[k as SortKeys] = "asc"; // Reset all other columns to "asc"
        }
      }
      newSortOrders[key] = prev[key] === "asc" ? "desc" : "asc"; // Toggle the clicked column
      return newSortOrders;
    });
    setSortKey(key);
  }

  const filteredTasks = selectedCategory
    ? tasks.filter((task) => task.category.includes(selectedCategory))
    : tasks;

  const sortedTasks = useCallback(
    () =>
      sortData({
        tableData: filteredTasks,
        sortKey,
        reverse: sortOrders[sortKey] === "desc",
      }),
    [filteredTasks, sortKey, sortOrders]
  );

  return (
    <div className="app">
      <div className="head">
        <button
          className="add-button"
          onClick={() => setShowAddTask(!showAddTask)}
        >
          <DiffAddedIcon /> Add task
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
            {Array.from(new Set(tasks.flatMap((task) => task.category))).map(
              (category, index) => (
                <option key={index} value={category.toLowerCase()}>
                  {category}
                </option>
              )
            )}
          </select>
        </div>
        <div className="sort">
          <table>
            <thead>
              <tr>
                {headers.map((row) => {
                  return (
                    <td key={row.key}>
                      <SortButton
                        columnKey={row.key}
                        onClick={() => changeSort(row.key)}
                        sortOrder={sortOrders[row.key]}
                        sortKey={sortKey}
                        label={row.label}
                      ></SortButton>
                    </td>
                  );
                })}
              </tr>
            </thead>
          </table>
        </div>
      </div>
      <div className={`task-list ${showAddTask ? "blurred" : ""}`}>
        {sortedTasks().map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onEdit={() => {
              setEditTaskId(task.id);
              setShowAddTask(true);
            }}
            onDelete={handleDeleteTask}
            onStateChange={handleStateChange}
          />
        ))}
      </div>
    </div>
  );
};

export default App;
