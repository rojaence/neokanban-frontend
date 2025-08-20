export interface Task {
  id: string;
  title: string;
  status: 'pending' | 'completed';
  description: string;
  createdAt: Date;
}

export const tasks: Task[] = [
  {
    id: 'task1',
    title: 'Tarea 1',
    status: 'pending',
    description: 'descripcion tarea 1',
    createdAt: new Date(),
  },
  {
    id: 'task2',
    title: 'Tarea 2',
    status: 'pending',
    description: 'descripcion tarea 2',
    createdAt: new Date(),
  },
  {
    id: 'task3',
    title: 'Tarea 3',
    status: 'completed',
    description: 'descripcion tarea 3',
    createdAt: new Date(),
  },
];
