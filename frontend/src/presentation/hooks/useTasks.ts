import { useState, useEffect, useCallback, useMemo } from 'react';
import type { Task, TaskPriority, TaskStatus } from '../../domain/entities/Task';
import { taskService } from '../../infrastructure/di/container';
import type { CreateTaskInput } from '../../application/services/TaskService';

export interface TaskFilters {
  status: 'all' | TaskStatus;
  priority: 'all' | TaskPriority;
}

interface UseTasksReturn {
  tasks: Task[];
  filteredTasks: Task[];
  filters: TaskFilters;
  loading: boolean;
  error: string | null;
  dashboard: Record<TaskStatus, number> & { total: number };
  setStatusFilter: (status: TaskFilters['status']) => void;
  setPriorityFilter: (priority: TaskFilters['priority']) => void;
  createTask: (input: CreateTaskInput) => Promise<void>;
  updateTask: (id: string, updates: Partial<Task>) => Promise<void>;
  deleteTask: (id: string) => Promise<void>;
  refetch: () => Promise<void>;
}

export function useTasks(): UseTasksReturn {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<TaskFilters>({ status: 'all', priority: 'all' });

  const refetch = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await taskService.getAll();
      setTasks(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load tasks');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refetch();
  }, [refetch]);

  const createTask = useCallback(async (input: CreateTaskInput) => {
    const task = await taskService.create(input);
    setTasks((prev) => [...prev, task]);
  }, []);

  const updateTask = useCallback(async (id: string, updates: Partial<Task>) => {
    const updated = await taskService.update(id, updates);
    setTasks((prev) => prev.map((task) => (task.id === id ? updated : task)));
  }, []);

  const deleteTask = useCallback(async (id: string) => {
    await taskService.delete(id);
    setTasks((prev) => prev.filter((task) => task.id !== id));
  }, []);

  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      const statusMatch = filters.status === 'all' || task.status === filters.status;
      const priorityMatch = filters.priority === 'all' || task.priority === filters.priority;
      return statusMatch && priorityMatch;
    });
  }, [tasks, filters]);

  const dashboard = useMemo(() => {
    const counts: Record<TaskStatus, number> & { total: number } = {
      total: tasks.length,
      todo: 0,
      'in-progress': 0,
      done: 0,
    };

    for (const task of tasks) {
      counts[task.status] += 1;
    }

    return counts;
  }, [tasks]);

  const setStatusFilter = useCallback((status: TaskFilters['status']) => {
    setFilters((prev) => ({ ...prev, status }));
  }, []);

  const setPriorityFilter = useCallback((priority: TaskFilters['priority']) => {
    setFilters((prev) => ({ ...prev, priority }));
  }, []);

  return {
    tasks,
    filteredTasks,
    filters,
    loading,
    error,
    dashboard,
    setStatusFilter,
    setPriorityFilter,
    createTask,
    updateTask,
    deleteTask,
    refetch,
  };
}
