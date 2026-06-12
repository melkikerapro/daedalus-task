import { useState } from 'react';
import type { CreateTaskInput } from '../../application/services/TaskService';
import type { TaskPriority, TaskStatus } from '../../domain/entities/Task';

interface TaskFormProps {
  onSubmit: (input: CreateTaskInput) => Promise<void>;
}

const statusOptions: TaskStatus[] = ['todo', 'in-progress', 'done'];
const priorityOptions: TaskPriority[] = ['low', 'medium', 'high'];

const initialForm: CreateTaskInput = {
  title: '',
  description: '',
  status: 'todo',
  priority: 'medium',
  dueDate: undefined,
};

export function TaskForm({ onSubmit }: TaskFormProps) {
  const [form, setForm] = useState<CreateTaskInput>(initialForm);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updateField = (name: keyof CreateTaskInput, value: string) => {
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitting(true);
    setError(null);
    console.log('Submitting form with data:', form);
    try {
      await onSubmit({
        ...form,
        dueDate: form.dueDate || undefined,
      });
      setForm(initialForm);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to create task');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: 24, padding: 16, border: '1px solid #d7dee8', borderRadius: 10 }}>
      <h2 style={{ marginTop: 0 }}>Create Task</h2>
      {error && <p style={{ color: '#c53030' }}>{error}</p>}
      <div style={{ display: 'grid', gap: 10 }}>
        <input
          name="title"
          value={form.title}
          onChange={(event) => updateField('title', event.target.value)}
          placeholder="Title"
          required
          style={{ padding: 10, borderRadius: 6, border: '1px solid #cbd5e0' }}
        />

        <textarea
          name="description"
          value={form.description}
          onChange={(event) => updateField('description', event.target.value)}
          placeholder="Description"
          rows={3}
          style={{ padding: 10, borderRadius: 6, border: '1px solid #cbd5e0', resize: 'vertical' }}
        />

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: 8 }}>
          <select
            name="status"
            value={form.status}
            onChange={(event) => updateField('status', event.target.value)}
            style={{ padding: 10, borderRadius: 6, border: '1px solid #cbd5e0' }}
          >
            {statusOptions.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>

          <select
            name="priority"
            value={form.priority}
            onChange={(event) => updateField('priority', event.target.value)}
            style={{ padding: 10, borderRadius: 6, border: '1px solid #cbd5e0' }}
          >
            {priorityOptions.map((priority) => (
              <option key={priority} value={priority}>
                {priority}
              </option>
            ))}
          </select>

          <input
            type="date"
            name="dueDate"
            value={form.dueDate ?? ''}
            onChange={(event) => updateField('dueDate', event.target.value)}
            style={{ padding: 10, borderRadius: 6, border: '1px solid #cbd5e0' }}
          />
        </div>

        <button
          type="submit"
          disabled={submitting}
          style={{
            padding: '10px 16px',
            border: 0,
            borderRadius: 6,
            backgroundColor: '#0f4c81',
            color: '#fff',
            fontWeight: 600,
            cursor: submitting ? 'not-allowed' : 'pointer',
          }}
        >
          {submitting ? 'Creating...' : 'Add task'}
        </button>
      </div>
    </form>
  );
}
