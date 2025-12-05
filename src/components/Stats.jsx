import { StatItem } from './StatItem';

export const Stats = ({ totalTasks, completedTasks, pendingTasks }) => {
  return (
    <div className="stats">
      <StatItem label="Total" value={totalTasks} />
      <StatItem label="Concluídas" value={completedTasks} variant="completed" />
      <StatItem label="Pendentes" value={pendingTasks} variant="pending" />
    </div>
  );
};
