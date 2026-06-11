import { v4 as uuidv4 } from 'uuid';
import { Task } from '../../domain/entities/Task';
import { TaskRepository } from '../../domain/repositories/TaskRepository';

export class InMemoryTaskRepository implements TaskRepository {
  private tasks: Map<string, Task> = new Map();

  async findAll(): Promise<Task[]> {
    return Array.from(this.tasks.values());
  }

  async findById(id: string): Promise<Task | null> {
    return this.tasks.get(id) ?? null;
  }

  async create(task: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>): Promise<Task> {
    const now = new Date().toISOString();
    const newTask: Task = { ...task, id: uuidv4(), createdAt: now, updatedAt: now };
    this.tasks.set(newTask.id, newTask);
    return newTask;
  }

  async update(id: string, updates: Partial<Task>): Promise<Task> {
    const existing = this.tasks.get(id);
    if (!existing) {
      throw new Error(`Task ${id} not found`);
    }
    const updated: Task = { ...existing, ...updates, id, updatedAt: new Date().toISOString() };
    this.tasks.set(id, updated);
    return updated;
  }

  async delete(id: string): Promise<void> {
    if (!this.tasks.has(id)) {
      throw new Error(`Task ${id} not found`);
    }
    this.tasks.delete(id);
  }
}
