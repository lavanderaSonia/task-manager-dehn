import type { Task } from '@/types/Task';

/**
 * Repository interface for Task data access abstraction
 * Defines the contract that all task repositories must implement
 */
export interface ITaskRepository {
  /**
   * Get all tasks
   * @returns list of all tasks
   */
  getTasks(): Promise<Task[]>;

  /**
   * Get a specific task by id
   * @param id task id
   * @returns task or null if not found
   */
  getTaskById(id: string): Promise<Task | null>;

  /**
   * Add a new task
   * @param task task to add
   */
  addTask(task: Task): Promise<void>;

  /**
   * Update an existing task
   * @param id task id
   * @param updates partial task object with fields to update
   * @returns true if updated successfully, false if task not found
   */
  updateTask(id: string, updates: Partial<Task>): Promise<boolean>;

  /**
   * Delete a task by id
   * @param id task id
   * @returns true if deleted successfully, false if task not found
   */
  deleteTask(id: string): Promise<boolean>;
}
