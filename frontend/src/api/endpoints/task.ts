import api from '../axios'

import type { Task } from '../../types/api'

export const createTask = async (data: Task): Promise<Task> => {
  const response = await api.post('/tasks/', data)
  return response.data as Task
}

export const getTasks = async (): Promise<Task[]> => {
  const response = await api.get('/tasks/')
  return response.data as Task[]
}

export const getTaskById = async (id: string): Promise<Task> => {
  const response = await api.get(`/tasks/${id}`)
  return response.data as Task
}

export const updateTaskById = async (id: number, data: Partial<Task>): Promise<Task> => {
  const response = await api.patch(`/tasks/${id}`, data)
  return response.data as Task
}

export const updateTaskPosition = async (id: number, position: number, listId: number): Promise<Task> => {
  const response = await api.patch(`/tasks/${id}/position`, { position, listId })
  return response.data as Task
}

export const deleteTaskById = async (id: number): Promise<void> => {
  await api.delete(`/tasks/${id}`)
}
