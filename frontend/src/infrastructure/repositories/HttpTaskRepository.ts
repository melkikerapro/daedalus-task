import type { Task } from '../../domain/entities/Task';
import type { TaskRepository } from '../../domain/repositories/TaskRepository';

const API_BASE_URL = import.meta.env.VITE_API_URL ?? '/api';

export class HttpTaskRepository implements TaskRepository {
  private async request<T>(path: string, options?: RequestInit): Promise<T> {
    const response = await fetch(`${API_BASE_URL}${path}`, {
      headers: { 'Content-Type': 'application/json' },
      ...options,
    });
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    return response.json() as Promise<T>;
  }

  findAll(): Promise<Task[]> {
    return this.request<Task[]>('/tasks');
  }

  findById(id: string): Promise<Task | null> {
    return this.request<Task | null>(`/tasks/${id}`);
  }

  create(task: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>): Promise<Task> {
    return this.request<Task>('/tasks', {
      method: 'POST',
      body: JSON.stringify(task),
    });
  }

  update(id: string, task: Partial<Task>): Promise<Task> {
    return this.request<Task>(`/tasks/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(task),
    });
  }

  async delete(id: string): Promise<void> {
    await this.request<void>(`/tasks/${id}`, { method: 'DELETE' });
  }
}
