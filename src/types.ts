// src/types.ts
export interface Task {
    id: number;
    title: string;
    description: string;
    deadline: string;
    priority: "low" | "medium" | "high";
  }
  