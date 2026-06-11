import { TaskService } from '../../application/services/TaskService';
import { AmplifyTaskRepository } from '../repositories/AmplifyTaskRepository';

const taskRepository = new AmplifyTaskRepository();

export const taskService = new TaskService(taskRepository);
