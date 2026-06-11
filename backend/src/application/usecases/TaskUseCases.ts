import { Task } from '../../domain/entities/Task';
import { TaskRepository } from '../../domain/repositories/TaskRepository';

export class GetAllTasksUseCase {
  constructor(private readonly repo: TaskRepository) {}
  execute(): Promise<Task[]> {
    return this.repo.findAll();
  }
}

export class GetTaskByIdUseCase {
  constructor(private readonly repo: TaskRepository) {}
  execute(id: string): Promise<Task | null> {
    return this.repo.findById(id);
  }
}

export class CreateTaskUseCase {
  constructor(private readonly repo: TaskRepository) {}
  async execute(input: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>): Promise<Task> {
    if (!input.title?.trim()) {
      throw new Error('Task title cannot be empty');
    }
    return this.repo.create(input);
  }
}

export class UpdateTaskUseCase {
  constructor(private readonly repo: TaskRepository) {}
  execute(id: string, updates: Partial<Task>): Promise<Task> {
    return this.repo.update(id, updates);
  }
}

export class DeleteTaskUseCase {
  constructor(private readonly repo: TaskRepository) {}
  execute(id: string): Promise<void> {
    return this.repo.delete(id);
  }
}
