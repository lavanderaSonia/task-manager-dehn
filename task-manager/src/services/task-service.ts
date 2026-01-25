import type { Task } from "@/types/Task";

const STORAGE_KEY = 'tasks';

/**
 * Task service to persist data
 */
export const taskService = {
  /**
   * Get all tasks 
   * @returns list of tasks
   */
  getTasks(): Task[] {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Error getting tasks from localStorage:', error);
      return [];
    }
  },

  /**
   * Get task information by id
   * @param id task id
   * @returns information of selected task
   */
  getTaskById(id: string): Task | null {
    const tasks = this.getTasks();
    return tasks.find(task => task.id === id) || null;
  },

  /**
   * Add task to list
   * @param task task to add
   */
  addTask(task: Task): void {
    try {
      const updatedTasks = [...this.getTasks(), task];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedTasks));
    } catch (error) {
      console.error('Error adding task to localStorage:', error);
    }
  },

  /**
   * Update task with the information
   * @param id task id
   * @param updates fields to update
   * @returns true if tasks updated or false in case of an error
   */
  updateTask(id: string, updates: Partial<Task>): boolean {
    try {
      const tasks = this.getTasks();
      const taskExists = tasks.some(task => task.id === id);

      if (!taskExists) return false;

      const updatedTasks = tasks.map(task =>
        task.id === id ? { ...task, ...updates } : task
      );

      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedTasks));
      return true;
    } catch (error) {
      console.error('Error updating task in localStorage:', error);
      return false;
    }
  },

  /**
   * Delete task by id
   * @param id task id
   * @returns True if process complete or false in other case
   */
  deleteTask(id: string): boolean {
    try {
      const tasks = this.getTasks();
      const filteredTasks = tasks.filter(task => task.id !== id);

      if (filteredTasks.length === tasks.length) return false;

      localStorage.setItem(STORAGE_KEY, JSON.stringify(filteredTasks));
      return true;
    } catch (error) {
      console.error('Error deleting task from localStorage:', error);
      return false;
    }
  }
};