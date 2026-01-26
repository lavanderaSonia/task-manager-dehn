/**
 * Messages Configuration
 * Centralized error and info messages to avoid magic strings
 */
export const ERROR_MESSAGES = {
  LOAD_TASKS: 'Error loading tasks',
  ADD_TASK: 'Error adding task',
  UPDATE_TASK: 'Error updating task',
  DELETE_TASK: 'Error deleting task',
  TASK_NOT_FOUND: 'Task not found'
} as const;

export const INFO_MESSAGES = {
  LOADING_TASKS: 'Loading tasks...',
  LOADING_TASK: 'Loading task...',
  NO_DATA: 'No data available'
} as const;
