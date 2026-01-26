import type { ITaskRepository } from '@/repositories/ITaskRepository';
import type { Task } from '@/types/Task';
import { LocalStorageTaskRepository } from '@/repositories/LocalStorageTaskRepository';

/**
 * Task Service with Dependency Injection
 * Business logic layer that abstracts data access
 */
export class TaskService {
  private repository: ITaskRepository;

  constructor(repository: ITaskRepository) {
    this.repository = repository;
  }

  /**
   * Get all tasks
   * @returns list of all tasks
   */
  async getTasks(): Promise<Task[]> {
    return this.repository.getTasks();
  }

  /**
   * Get task information by id
   * @param id task id
   * @returns information of selected task or null
   */
  async getTaskById(id: string): Promise<Task | null> {
    return this.repository.getTaskById(id);
  }

  /**
   * Add task to list
   * @param task task to add
   */
  async addTask(task: Task): Promise<void> {
    return this.repository.addTask(task);
  }

  /**
   * Update task with the information
   * @param id task id
   * @param updates fields to update
   * @returns true if task updated or false if not found
   */
  async updateTask(id: string, updates: Partial<Task>): Promise<boolean> {
    return this.repository.updateTask(id, updates);
  }

  /**
   * Delete task by id
   * @param id task id
   * @returns true if task deleted or false if not found
   */
  async deleteTask(id: string): Promise<boolean> {
    return this.repository.deleteTask(id);
  }
}

/**
 * Default task service instance using localStorage
 * Change the repository implementation to switch persistence layer
 */
const defaultRepository = new LocalStorageTaskRepository();
export const taskService = new TaskService(defaultRepository);