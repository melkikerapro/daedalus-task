import { useTasks } from '../hooks/useTasks';
import { TaskForm } from '../components/TaskForm';
import { TaskDashboard } from '../components/TaskDashboard';
import { TaskList } from '../components/TaskList';

interface TasksPageProps {
  username: string;
  onSignOut: () => void;
}

export function TasksPage({ username, onSignOut }: TasksPageProps) {
  const {
    filteredTasks,
    loading,
    error,
    filters,
    dashboard,
    createTask,
    updateTask,
    deleteTask,
    setStatusFilter,
    setPriorityFilter,
  } = useTasks();

  return (
    <div style={{ maxWidth: 800, margin: '0 auto', padding: '24px 16px' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
        <div>
          <h1 style={{ margin: 0, color: '#2d3748' }}>DaedalusTask</h1>
          <p style={{ margin: '4px 0 0', color: '#4a5568' }}>Connected as {username}</p>
        </div>
        <button
          onClick={onSignOut}
          style={{ padding: '8px 12px', borderRadius: 6, border: '1px solid #cbd5e0', background: '#fff' }}
        >
          Sign out
        </button>
      </header>

      <TaskDashboard counts={dashboard} />

      <TaskForm onSubmit={createTask} />

      {loading && <p style={{ color: '#718096' }}>Loading tasks...</p>}
      {error && <p style={{ color: '#e53e3e' }}>{error}</p>}

      {!loading && (
        <TaskList
          tasks={filteredTasks}
          onUpdate={updateTask}
          onDelete={deleteTask}
          statusFilter={filters.status}
          priorityFilter={filters.priority}
          onStatusFilterChange={setStatusFilter}
          onPriorityFilterChange={setPriorityFilter}
        />
      )}
    </div>
  );
}
