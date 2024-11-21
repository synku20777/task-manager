// src/types.ts
export interface Task {
  id: number;
  state: "completed" | "active";
  title: string;
  category: string[];
  description: string;
  deadline: Date;
  priority: 1 | 2 | 3;
}
