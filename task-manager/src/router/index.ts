import { createRouter, createWebHistory } from 'vue-router'
import TaskList from '@/views/TaskList.vue'
import AddTask from '@/views/AddTask.vue'

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', redirect: '/tasks' },
    { path: '/tasks', component: TaskList },
    { path: '/add-task', component: AddTask }
  ]
})
