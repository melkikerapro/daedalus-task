import type { Task, TaskPriority, TaskStatus } from '../../domain/entities/Task';
import type { TaskRepository } from '../../domain/repositories/TaskRepository';

export interface CreateTaskInput {
  title: string;
  description?: string;
  status: TaskStatus;
  priority: TaskPriority;
  dueDate?: string;
  assignedTo?: string;
}

export class TaskService {
  constructor(private readonly taskRepository: TaskRepository) {}

  async getAll(): Promise<Task[]> {
    return this.taskRepository.findAll();
  }

  async create(input: CreateTaskInput): Promise<Task> {
    console.log('Creating task with input:', input);
    if (!input.title.trim()) {
      throw new Error('Task title cannot be empty');
    }
    console.log('Creating task with input:', input);
    return this.taskRepository.create(input);
  }

  async update(id: string, updates: Partial<Task>): Promise<Task> {
    return this.taskRepository.update(id, updates);
  }

  async delete(id: string): Promise<void> {
    return this.taskRepository.delete(id);
  }
}