import type { ITaskRepository } from './ITaskRepository';
import type { Task } from '@/types/Task';
import { STORAGE_KEYS } from '@/config/storage-keys';

/**
 * LocalStorage implementation of TaskRepository
 * Only persists raw data - no business logic
 */
export class LocalStorageTaskRepository implements ITaskRepository {
  private readonly STORAGE_KEY = STORAGE_KEYS.TASKS;

  /**
   * Private helper to get tasks from localStorage
   */
  private getTasksFromStorage(): Task[] {
    try {
      const data = localStorage.getItem(this.STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Error reading from localStorage:', error);
      return [];
    }
  }

  /**
   * Private helper to save tasks to localStorage
   */
  private saveTasksToStorage(tasks: Task[]): void {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(tasks));
    } catch (error) {
      console.error('Error writing to localStorage:', error);
      throw new Error('Failed to save tasks');
    }
  }

  async getTasks(): Promise<Task[]> {
    return this.getTasksFromStorage();
  }

  async getTaskById(id: string): Promise<Task | null> {
    const tasks = this.getTasksFromStorage();
    return tasks.find((task: Task) => task.id === id) || null;
  }

  async addTask(task: Task): Promise<void> {
    const tasks = this.getTasksFromStorage();
    this.saveTasksToStorage([...tasks, task]);
  }

  async updateTask(id: string, updates: Partial<Task>): Promise<boolean> {
    const tasks = this.getTasksFromStorage();
    const taskIndex = tasks.findIndex((task: Task) => task.id === id);

    if (taskIndex === -1) return false;

    const updatedTasks = tasks.map((task, index) =>
      index === taskIndex ? { ...task, ...updates } : task
    );
    this.saveTasksToStorage(updatedTasks);
    return true;
  }

  async deleteTask(id: string): Promise<boolean> {
    const tasks = this.getTasksFromStorage();
    const filteredTasks = tasks.filter((task: Task) => task.id !== id);

    if (filteredTasks.length === tasks.length) return false;

    this.saveTasksToStorage(filteredTasks);
    return true;
  }
}
