import type { ITaskRepository } from './ITaskRepository';
import type { Task } from '@/types/Task';

/**
 * LocalStorage implementation of TaskRepository
 * Persists tasks in browser localStorage
 */
export class LocalStorageTaskRepository implements ITaskRepository {
  private readonly STORAGE_KEY = 'tasks';

  private deserializeTask(taskData: any): Task {
    return {
      ...taskData,
      dueDate: taskData.dueDate ? new Date(taskData.dueDate) : new Date()
    };
  }

  async getTasks(): Promise<Task[]> {
    try {
      const data = localStorage.getItem(this.STORAGE_KEY);
      return data ? JSON.parse(data).map(this.deserializeTask) : [];
    } catch (error) {
      console.error('Error getting tasks from localStorage:', error);
      return [];
    }
  }

  async getTaskById(id: string): Promise<Task | null> {
    try {
      const tasks = await this.getTasks();
      return tasks.find(task => task.id === id) || null;
    } catch (error) {
      console.error('Error getting task by id from localStorage:', error);
      return null;
    }
  }

  async addTask(task: Task): Promise<void> {
    try {
      const tasks = await this.getTasks();
      const updatedTasks = [...tasks, task];
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(updatedTasks));
    } catch (error) {
      console.error('Error adding task to localStorage:', error);
      throw new Error('Failed to add task');
    }
  }

  async updateTask(id: string, updates: Partial<Task>): Promise<boolean> {
    try {
      const tasks = await this.getTasks();
      const taskExists = tasks.some(task => task.id === id);

      if (!taskExists) return false;

      const updatedTasks = tasks.map(task =>
        task.id === id ? { ...task, ...updates } : task
      );

      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(updatedTasks));
      return true;
    } catch (error) {
      console.error('Error updating task in localStorage:', error);
      throw new Error('Failed to update task');
    }
  }

  async deleteTask(id: string): Promise<boolean> {
    try {
      const tasks = await this.getTasks();
      const filteredTasks = tasks.filter(task => task.id !== id);

      if (filteredTasks.length === tasks.length) return false;

      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(filteredTasks));
      return true;
    } catch (error) {
      console.error('Error deleting task from localStorage:', error);
      throw new Error('Failed to delete task');
    }
  }
}
