import React from 'react';
import './ExpCard.css'

interface ExpCardProps {
  title?: string;
  subtitle?: string;
  items?: string[];
  children?: React.ReactNode;
}

const ExpCard: React.FC<ExpCardProps> = ({ title, subtitle, items, children }) => {
  return (
    <div className="exp-card">
      {title && <h3>{title}</h3>}
      {subtitle && <h5 className="text-muted">{subtitle}</h5>}
      {items && (
        <ul>
          {items.map((item, idx) => (
            <li key={idx}>{item}</li>
          ))}
        </ul>
      )}
      {children}
    </div>
  );
};

export default ExpCard;
