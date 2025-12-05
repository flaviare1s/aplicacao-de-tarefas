export const StatItem = ({ label, value, variant }) => {
  return (
    <div className="stat-item">
      <span className="stat-label">{label}</span>
      <span className={`stat-value ${variant || ''}`}>{value}</span>
    </div>
  );
};
