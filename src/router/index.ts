import path from 'path'
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  { path: '/', component: () => import('../views/Products.vue') },
  {
    path: '/settings',
    component: () => import('../views/Settings.vue')
  }
]
