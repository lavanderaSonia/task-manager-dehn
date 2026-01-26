/**
 * Application Routes Configuration
 * Centralized route definitions to avoid magic strings
 */
export const APP_ROUTES = {
  ROOT: '/',
  TASKS: '/tasks',
  ADD_TASK: '/add-task',
  EDIT_TASK_PATTERN: '/edit/:id',
  EDIT_TASK: (id: string) => `/edit/${id}`
} as const;
