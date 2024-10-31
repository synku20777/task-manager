// src/types.ts
export interface Task {
  id: number;
  title: string;
  category: string[];
  description: string;
  deadline: string;
  priority: "low" | "medium" | "high";
}
