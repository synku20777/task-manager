// src/types.ts
export interface Task {
  id: number;
  title: string;
  category: string[];
  description: string;
  deadline: Date;
  priority: 1 | 2 | 3;
}
