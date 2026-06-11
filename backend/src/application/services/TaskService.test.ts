import { describe, expect, it, jest } from '@jest/globals';
import { TaskService } from './TaskService';
import type { Task } from '../../domain/entities/Task';
import type { TaskRepository } from '../../domain/repositories/TaskRepository';

function createRepositoryMock(): jest.Mocked<TaskRepository> {
  return {
    findAll: jest.fn(async () => []),
    findById: jest.fn(async () => null),
    create: jest.fn(async (task: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => ({
      ...task,
      id: 'task-1',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    })),
    update: jest.fn(async (_id: string, updates: Partial<Task>) => ({
      id: 'task-1',
      title: 'title',
      status: 'todo',
      priority: 'medium',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      ...updates,
    })),
    delete: jest.fn(async () => undefined),
  };
}

describe('TaskService', () => {
  it('throws for empty title', async () => {
    const service = new TaskService(createRepositoryMock());

    await expect(
      service.create({
        title: '   ',
        description: 'desc',
        status: 'todo',
        priority: 'high',
      })
    ).rejects.toThrow('Task title cannot be empty');
  });

  it('calls repository create for valid payload', async () => {
    const repository = createRepositoryMock();
    const service = new TaskService(repository);

    const result = await service.create({
      title: 'Task B',
      description: 'desc',
      status: 'todo',
      priority: 'low',
    });

    expect(result.id).toBe('task-1');
    expect(repository.create).toHaveBeenCalledTimes(1);
  });
});
