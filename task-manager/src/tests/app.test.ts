import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { TaskService } from '@/services/task-service'
import { useTaskViewModel } from '@/composables/useTaskViewModel'
import { LocalStorageTaskRepository } from '@/repositories/LocalStorageTaskRepository'
import type { Task } from '@/types/Task'

/**
 * Integration Testing Suite - Task Manager Application
 * Minimal tests covering all layers: Repository → Service → ViewModel
 */

describe('Task Manager - Integration Tests', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  afterEach(() => {
    localStorage.clear()
  })

  describe('CRUD Operations - All Layers', () => {
    it('should create, read, update and delete tasks through all layers', async () => {
      const repository = new LocalStorageTaskRepository()
      const service = new TaskService(repository)

      // CREATE
      const newTask: Task = {
        id: 'task-1',
        title: 'Test Task',
        description: 'Testing CRUD',
        dueDate: new Date('2025-12-31'),
        state: 'Pending'
      }
      await service.addTask(newTask)

      let tasks = await service.getTasks()
      expect(tasks).toHaveLength(1)

      // READ
      const found = await service.getTaskById('task-1')
      expect(found?.title).toBe('Test Task')

      // UPDATE
      const updated = await service.updateTask('task-1', { state: 'Completed' })
      expect(updated).toBe(true)
      expect((await service.getTaskById('task-1'))?.state).toBe('Completed')

      // DELETE
      const deleted = await service.deleteTask('task-1')
      expect(deleted).toBe(true)
      expect(await service.getTasks()).toHaveLength(0)
    })

    it('should handle multiple tasks and state changes', async () => {
      const service = new TaskService(new LocalStorageTaskRepository())

      // Add multiple tasks
      for (let i = 1; i <= 3; i++) {
        await service.addTask({
          id: `task-${i}`,
          title: `Task ${i}`,
          description: `Description ${i}`,
          dueDate: new Date(),
          state: 'Pending'
        })
      }

      const tasks = await service.getTasks()
      expect(tasks).toHaveLength(3)

      // Update states
      await service.updateTask('task-1', { state: 'Completed' })
      await service.updateTask('task-2', { state: 'Completed' })

      const remaining = await service.getTasks()
      const completed = remaining.filter(t => t.state === 'Completed')
      expect(completed).toHaveLength(2)
    })
  })

  describe('ViewModel State Management', () => {
    it('should add, update and remove tasks through ViewModel', async () => {
      const { addNewTask, updateExistingTask, removeTask, tasks, error } = useTaskViewModel()

      // Add task
      await addNewTask({
        title: 'ViewModel Task',
        description: 'Test',
        dueDate: new Date()
      })
      expect(tasks.value).toHaveLength(1)
      expect(error.value).toBeNull()

      const taskId = tasks.value[0]!.id

      // Update task
      const updateSuccess = await updateExistingTask(taskId, { state: 'Completed' })
      expect(updateSuccess).toBe(true)
      expect(tasks.value[0]?.state).toBe('Completed')

      // Remove task
      const removeSuccess = await removeTask(taskId)
      expect(removeSuccess).toBe(true)
      expect(tasks.value).toHaveLength(0)
    })

    it('should handle errors correctly', async () => {
      const { removeTask, updateExistingTask, error } = useTaskViewModel()

      // Try to remove non-existent task
      await removeTask('fake-id')
      expect(error.value).toBe('Task not found')

      // Try to update non-existent task
      await updateExistingTask('fake-id', { title: 'Test' })
      expect(error.value).toBe('Task not found')
    })
  })

  describe('Data Persistence', () => {
    it('should persist and retrieve tasks from localStorage', async () => {
      const { addNewTask, tasks } = useTaskViewModel()

      // Create tasks
      await addNewTask({ title: 'Task 1', description: 'Desc', dueDate: new Date() })
      await addNewTask({ title: 'Task 2', description: 'Desc', dueDate: new Date() })
      expect(tasks.value).toHaveLength(2)

      // New instance should load same data
      const newVM = useTaskViewModel()
      await newVM.loadTasks()
      expect(newVM.tasks.value).toHaveLength(2)
      expect(newVM.tasks.value[0]?.title).toBe('Task 1')
    })
  })

  describe('Loading States', () => {
    it('should manage loading state during operations', async () => {
      const { loadTasks, loading } = useTaskViewModel()

      expect(loading.value).toBe(false)
      const promise = loadTasks()
      expect(loading.value).toBe(true)
      await promise
      expect(loading.value).toBe(false)
    })
  })

})

