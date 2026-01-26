import { createRouter, createWebHistory } from 'vue-router'
import TaskList from '@/views/TaskList.vue'
import AddTask from '@/views/AddTask.vue'
import UpdateTask from '@/views/UpdateTask.vue'

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', redirect: '/tasks' },
    { path: '/tasks', component: TaskList },
    { path: '/add-task', component: AddTask },
    { path: '/edit/:id', component: UpdateTask }
  ]
})
