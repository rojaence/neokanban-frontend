import type { RouteObject } from 'react-router';
import { TaskList } from './views/TaskList';

export const TaskRoutes: RouteObject[] = [
  {
    index: true,
    Component: TaskList,
  },
];
