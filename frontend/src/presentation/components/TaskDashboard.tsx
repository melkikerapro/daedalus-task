import type { TaskStatus } from '../../domain/entities/Task';

interface TaskDashboardProps {
  counts: Record<TaskStatus, number> & { total: number };
}

export function TaskDashboard({ counts }: TaskDashboardProps) {
  return (
    <section style={{ display: 'grid', gridTemplateColumns: 'repeat(4, minmax(0, 1fr))', gap: 10, marginBottom: 20 }}>
      <StatCard label="Total" value={counts.total} background="#edf2f7" />
      <StatCard label="Todo" value={counts.todo} background="#feebc8" />
      <StatCard label="In Progress" value={counts['in-progress']} background="#bee3f8" />
      <StatCard label="Done" value={counts.done} background="#c6f6d5" />
    </section>
  );
}

interface StatCardProps {
  label: string;
  value: number;
  background: string;
}

function StatCard({ label, value, background }: StatCardProps) {
  return (
    <div style={{ background, borderRadius: 10, padding: 14 }}>
      <p style={{ margin: 0, fontSize: 12, textTransform: 'uppercase', color: '#4a5568' }}>{label}</p>
      <p style={{ margin: '6px 0 0', fontSize: 26, fontWeight: 700 }}>{value}</p>
    </div>
  );
}
