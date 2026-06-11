import { describe, expect, it, vi } from 'vitest';
import { TaskService } from './TaskService';
import { TaskRepository } from '../../domain/repositories/TaskRepository';

function makeRepositoryMock(): TaskRepository {
  return {
    findAll: vi.fn(async () => []),
    findById: vi.fn(async () => null),
    create: vi.fn(async (task) => ({
      ...task,
      id: 'task-1',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    })),
    update: vi.fn(async (_id, updates) => ({
      id: 'task-1',
      title: 'title',
      status: 'todo',
      priority: 'medium',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      ...updates,
    })),
    delete: vi.fn(async () => undefined),
  };
}

describe('TaskService', () => {
  it('throws when title is empty', async () => {
    const service = new TaskService(makeRepositoryMock());

    await expect(
      service.create({
        title: '   ',
        description: 'desc',
        status: 'todo',
        priority: 'high',
      })
    ).rejects.toThrow('Task title cannot be empty');
  });

  it('creates a task when payload is valid', async () => {
    const repo = makeRepositoryMock();
    const service = new TaskService(repo);

    const task = await service.create({
      title: 'Task A',
      description: 'desc',
      status: 'todo',
      priority: 'low',
    });

    expect(task.id).toBe('task-1');
    expect(repo.create).toHaveBeenCalledTimes(1);
  });
});
