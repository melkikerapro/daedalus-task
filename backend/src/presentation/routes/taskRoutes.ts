import { Router } from 'express';
import { TaskController } from '../controllers/TaskController';

export const taskRouter = Router();
const taskController = new TaskController();

taskRouter.get('/', taskController.getAll.bind(taskController));

taskRouter.get('/:id', taskController.getById.bind(taskController));

taskRouter.post('/', taskController.create.bind(taskController));

taskRouter.patch('/:id', taskController.update.bind(taskController));

taskRouter.delete('/:id', taskController.delete.bind(taskController));
