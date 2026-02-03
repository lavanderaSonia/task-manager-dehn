import type { ITaskRepository } from '@/repositories/ITaskRepository';
import type { Task } from '@/types/Task';
import { LocalStorageTaskRepository } from '@/repositories/LocalStorageTaskRepository';

/**
 * Task Service with Dependency Injection
 * Business logic layer: transformations, validations, and CRUD operations
 */
export class TaskService {
  private repository: ITaskRepository;

  constructor(repository: ITaskRepository) {
    this.repository = repository;
  }

  /**
   * Deserialize raw task data to Task object
   * Converts string dates to Date objects
   */
  private deserializeTask(taskData: any): Task {
    return {
      ...taskData,
      dueDate: taskData.dueDate ? new Date(taskData.dueDate) : new Date()
    };
  }

  /**
   * Get all tasks with deserialization
   * @returns list of all tasks with proper Date objects
   */
  async getTasks(): Promise<Task[]> {
    try {
      const tasks = await this.repository.getTasks();
      return tasks.map(task => this.deserializeTask(task));
    } catch (error) {
      console.error('Error getting tasks:', error);
      throw new Error('Failed to retrieve tasks');
    }
  }

  /**
   * Get task information by id with deserialization
   * @param id task id
   * @returns information of selected task or null
   */
  async getTaskById(id: string): Promise<Task | null> {
    try {
      const task = await this.repository.getTaskById(id);
      return task ? this.deserializeTask(task) : null;
    } catch (error) {
      console.error('Error getting task by id:', error);
      throw new Error('Failed to retrieve task');
    }
  }

  /**
   * Add task to list with validation
   * @param task task to add
   */
  async addTask(task: Task): Promise<void> {
    try {
      // Business logic: validate required fields
      if (!task.title?.trim()) {
        throw new Error('Task title is required');
      }
      if (!task.description?.trim()) {
        throw new Error('Task description is required');
      }

      await this.repository.addTask(task);
    } catch (error) {
      console.error('Error adding task:', error);
      throw error instanceof Error ? error : new Error('Failed to add task');
    }
  }

  /**
   * Update task with the information
   * @param id task id
   * @param updates fields to update
   * @returns true if task updated or false if not found
   */
  async updateTask(id: string, updates: Partial<Task>): Promise<boolean> {
    try {
      return await this.repository.updateTask(id, updates);
    } catch (error) {
      console.error('Error updating task:', error);
      throw new Error('Failed to update task');
    }
  }

  /**
   * Delete task by id
   * @param id task id
   * @returns true if task deleted or false if not found
   */
  async deleteTask(id: string): Promise<boolean> {
    try {
      return await this.repository.deleteTask(id);
    } catch (error) {
      console.error('Error deleting task:', error);
      throw new Error('Failed to delete task');
    }
  }
}

/**
 * Default task service instance using localStorage
 * Change the repository implementation to switch persistence layer
 */
const defaultRepository = new LocalStorageTaskRepository();
export const taskService = new TaskService(defaultRepository);