import { ref, computed } from 'vue';
import { taskService } from '@/services/task-service';
import type { Task } from '@/types/Task';


/**
 * Task ViewModel Composable
 * Handles presentation logic and state management for tasks
 * Abstracts the business logic and data layer from view components
 */
export function useTaskViewModel() {
  const tasks = ref<Task[]>([]);
  const loading = ref(false);
  const error = ref<string | null>(null);

  /**
   * Load all tasks from service
   */
  const loadTasks = async (): Promise<void> => {
    loading.value = true;
    error.value = null;
    try {
      tasks.value = await taskService.getTasks();
    } catch (err) {
      error.value = 'Error loading tasks';
      console.error(err);
    } finally {
      loading.value = false;
    }
  };

  /**
   * Add a new task
   * @param task task to add
   */
  const addNewTask = async (task: Pick<Task, 'title' | 'description' | 'dueDate'>): Promise<void> => {
    try {
      await taskService.addTask({ ...task, id: crypto.randomUUID(), state: 'Pending' });
      tasks.value = await taskService.getTasks();
      error.value = null;
    } catch (err) {
      error.value = 'Error adding task';
      console.error(err);
    }
  };

  /**
   * Update an existing task
   * @param id task id
   * @param updates fields to update
   * @returns true if updated successfully
   */
  const updateExistingTask = async (id: string, updates: Partial<Task>): Promise<boolean> => {
    try {
      const success = await taskService.updateTask(id, updates);
      if (success) {
        tasks.value = await taskService.getTasks();
        error.value = null;
      } else {
        error.value = 'Task not found';
      }
      return success;
    } catch (err) {
      error.value = 'Error updating task';
      console.error(err);
      return false;
    }
  };

  /**
   * Remove a task by id
   * @param id task id
   * @returns true if deleted successfully
   */
  const removeTask = async (id: string): Promise<boolean> => {
    try {
      const success = await taskService.deleteTask(id);
      if (success) {
        tasks.value = await taskService.getTasks();
        error.value = null;
      } else {
        error.value = 'Task not found';
      }
      return success;
    } catch (err) {
      error.value = 'Error deleting task';
      console.error(err);
      return false;
    }
  };

  /**
   * Get a single task by id
   * @param id task id
   * @returns task or null
   */
  const getTask = async (id: string): Promise<Task | null> => {
    try {
      return await taskService.getTaskById(id);
    } catch (err) {
      console.error(err);
      return null;
    }
  };

  /**
   * Clear error message
   */
  const clearError = (): void => {
    error.value = null;
  };

  return {
    // State
    tasks: computed(() => tasks.value),
    loading: computed(() => loading.value),
    error: computed(() => error.value),

    // Methods
    loadTasks,
    addNewTask,
    updateExistingTask,
    removeTask,
    getTask,
    clearError
  };
}
