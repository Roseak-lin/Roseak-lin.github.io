import React from "react";
import "./ExpCard.css";

interface ExpCardProps {
  title?: string;
  subtitle?: string;
  items?: string[];
  icon?: React.ReactNode;
  children?: React.ReactNode;
}

const ExpCard: React.FC<ExpCardProps> = ({
  title,
  subtitle,
  icon,
  items,
  children,
}) => {
  return (
    <div className="exp-card">
      {(title || icon) && (
        <div className="exp-card-header">
          {title && <h3 className="exp-card-title">{title}</h3>}
          {icon}
        </div>
      )}
      {subtitle && <p className="exp-card-subtitle text-muted">{subtitle}</p>}
      {items && (
        <ul className="exp-card-items">
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