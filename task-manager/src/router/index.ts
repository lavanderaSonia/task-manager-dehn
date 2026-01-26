import { createRouter, createWebHistory } from 'vue-router'
import TaskList from '@/views/TaskList.vue'
import AddTask from '@/views/AddTask.vue'
import UpdateTask from '@/views/UpdateTask.vue'
import { APP_ROUTES } from '@/config/routes'

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: APP_ROUTES.ROOT, redirect: APP_ROUTES.TASKS },
    { path: APP_ROUTES.TASKS, component: TaskList },
    { path: APP_ROUTES.ADD_TASK, component: AddTask },
    { path: APP_ROUTES.EDIT_TASK_PATTERN, component: UpdateTask }
  ]
})
