import { Task } from '../../domain/entities/Task';
import { TaskRepository } from '../../domain/repositories/TaskRepository';

interface TaskFilters {
  status?: Task['status'];
  priority?: Task['priority'];
}

export class TaskService {
  constructor(private readonly taskRepository: TaskRepository) {}

  async getAll(filters?: TaskFilters): Promise<Task[]> {
    const tasks = await this.taskRepository.findAll();
    return tasks.filter((task) => {
      const statusMatch = !filters?.status || task.status === filters.status;
      const priorityMatch = !filters?.priority || task.priority === filters.priority;
      return statusMatch && priorityMatch;
    });
  }

  getById(id: string): Promise<Task | null> {
    return this.taskRepository.findById(id);
  }

  async create(input: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>): Promise<Task> {
    if (!input.title?.trim()) {
      throw new Error('Task title cannot be empty');
    }
    return this.taskRepository.create(input);
  }

  update(id: string, updates: Partial<Task>): Promise<Task> {
    return this.taskRepository.update(id, updates);
  }

  delete(id: string): Promise<void> {
    return this.taskRepository.delete(id);
  }
}
