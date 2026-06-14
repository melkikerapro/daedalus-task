import type { Task, TaskPriority, TaskStatus } from '../../domain/entities/Task';
import { formatDate } from '../../shared/utils/formatDate';

interface TaskListProps {
  tasks: Task[];
  onUpdate: (id: string, updates: Partial<Task>) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
  statusFilter: 'all' | TaskStatus;
  priorityFilter: 'all' | TaskPriority;
  onStatusFilterChange: (status: 'all' | TaskStatus) => void;
  onPriorityFilterChange: (priority: 'all' | TaskPriority) => void;
}

const statuses: Array<'all' | TaskStatus> = ['all', 'todo', 'in-progress', 'done'];
const priorities: Array<'all' | TaskPriority> = ['all', 'low', 'medium', 'high'];

export function TaskList({
  tasks,
  onUpdate,
  onDelete,
  statusFilter,
  priorityFilter,
  onStatusFilterChange,
  onPriorityFilterChange,
}: TaskListProps) {
  return (
    <section>
      <div style={{ display: 'flex', gap: 8, marginBottom: 14 }}>
        <select
          value={statusFilter}
          onChange={(event) => onStatusFilterChange(event.target.value as 'all' | TaskStatus)}
          style={{ padding: 8, borderRadius: 6, border: '1px solid #cbd5e0' }}
        >
          {statuses.map((status) => (
            <option key={status} value={status}>
              status: {status}
            </option>
          ))}
        </select>

        <select
          value={priorityFilter}
          onChange={(event) => onPriorityFilterChange(event.target.value as 'all' | TaskPriority)}
          style={{ padding: 8, borderRadius: 6, border: '1px solid #cbd5e0' }}
        >
          {priorities.map((priority) => (
            <option key={priority} value={priority}>
              priority: {priority}
            </option>
          ))}
        </select>
      </div>

      {tasks.length === 0 && <p style={{ color: '#718096' }}>No tasks for the selected filters.</p>}

      <div style={{ display: 'grid', gap: 10 }}>
        {tasks.map((task) => (
          <article key={task.id} style={{ border: '1px solid #d7dee8', borderRadius: 10, padding: 14, background: '#fff' }}>
            <header style={{ display: 'flex', justifyContent: 'space-between', gap: 12 }}>
              <h3 style={{ margin: 0 }}>{task.title}</h3>
              <p style={{ margin: 0, fontSize: 12, color: '#4a5568' }}>
                {task.status} | {task.priority}
              </p>
            </header>

            {task.description && <p style={{ marginBottom: 6, color: '#2d3748' }}>{task.description}</p>}
            {task.dueDate && <p style={{ marginTop: 0, color: '#4a5568' }}>Due: {formatDate(task.dueDate.toString())}</p>}

            <div style={{ display: 'flex', gap: 8 }}>
              {task.status !== 'done' && (
                <button
                  onClick={() =>
                    onUpdate(task.id, {
                      status: task.status === 'todo' ? 'in-progress' : 'done',
                    })
                  }
                  style={{ padding: '6px 10px', borderRadius: 6, border: '1px solid #90cdf4', background: '#ebf8ff' }}
                >
                  {task.status === 'todo' ? 'Start' : 'Complete'}
                </button>
              )}
              <button
                onClick={() => onDelete(task.id)}
                style={{ padding: '6px 10px', borderRadius: 6, border: '1px solid #feb2b2', background: '#fff5f5' }}
              >
                Delete
              </button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
