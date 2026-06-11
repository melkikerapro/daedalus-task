import { InMemoryTaskRepository } from '../repositories/InMemoryTaskRepository';
import { TaskService } from '../../application/services/TaskService';

const taskRepository = new InMemoryTaskRepository();

export const container = {
  taskService: new TaskService(taskRepository),
};
