import { generateClient } from 'aws-amplify/api';
import type { Schema } from '../../../../amplify/data/resource';
import type { Task } from '../../domain/entities/Task';
import type { TaskRepository } from '../../domain/repositories/TaskRepository';

// The client is typed against the generated Amplify schema
const client = generateClient<Schema>();

function mapAmplifyTask(item: Schema['Task']['type']): Task {
  return {
    id: item.id,
    title: item.title,
    description: item.description ?? undefined,
    status: (item.status ?? 'todo') as Task['status'],
    priority: (item.priority ?? 'medium') as Task['priority'],
    dueDate: item.dueDate ?? undefined,
    assignedTo: item.assignedTo ?? undefined,
    createdAt: item.createdAt,
    updatedAt: item.updatedAt,
  };
}

export class AmplifyTaskRepository implements TaskRepository {
  async findAll(): Promise<Task[]> {
    const { data, errors } = await client.models.Task.list();
    if (errors?.length) throw new Error(errors[0].message);
    return (data ?? []).map(mapAmplifyTask);
  }

  async findById(id: string): Promise<Task | null> {
    const { data, errors } = await client.models.Task.get({ id });
    if (errors?.length) throw new Error(errors[0].message);
    return data ? mapAmplifyTask(data) : null;
  }

  async create(task: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>): Promise<Task> {
    const { data, errors } = await client.models.Task.create({
      title: task.title,
      description: task.description,
      status: task.status,
      priority: task.priority,
      dueDate: task.dueDate,
      assignedTo: task.assignedTo,
    });
    if (errors?.length) throw new Error(errors[0].message);
    return mapAmplifyTask(data!);
  }

  async update(id: string, updates: Partial<Task>): Promise<Task> {
    const { data, errors } = await client.models.Task.update({ id, ...updates });
    if (errors?.length) throw new Error(errors[0].message);
    return mapAmplifyTask(data!);
  }

  async delete(id: string): Promise<void> {
    const { errors } = await client.models.Task.delete({ id });
    if (errors?.length) throw new Error(errors[0].message);
  }
}
