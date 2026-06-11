import { Request, Response, NextFunction } from 'express';
import { container } from '../../infrastructure/di/container';

function getIdParam(value: string | string[]): string {
  return Array.isArray(value) ? value[0] : value;
}

export class TaskController {
  async getAll(_req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const status = _req.query.status as 'todo' | 'in-progress' | 'done' | undefined;
      const priority = _req.query.priority as 'low' | 'medium' | 'high' | undefined;
      const tasks = await container.taskService.getAll({ status, priority });
      res.json(tasks);
    } catch (err) {
      next(err);
    }
  }

  async getById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const task = await container.taskService.getById(getIdParam(req.params.id));
      if (!task) {
        res.status(404).json({ message: 'Task not found' });
        return;
      }
      res.json(task);
    } catch (err) {
      next(err);
    }
  }

  async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const task = await container.taskService.create(req.body);
      res.status(201).json(task);
    } catch (err) {
      next(err);
    }
  }

  async update(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const task = await container.taskService.update(getIdParam(req.params.id), req.body);
      res.json(task);
    } catch (err) {
      next(err);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      await container.taskService.delete(getIdParam(req.params.id));
      res.status(204).send();
    } catch (err) {
      next(err);
    }
  }
}
