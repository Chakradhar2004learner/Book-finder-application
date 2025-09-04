import React from 'react';

const EmptyState = ({ emoji, title, description }) => {
  return (
    <div className="empty-state">
      <p className="empty-state-emoji">{emoji}</p>
      <p className="empty-state-title">{title}</p>
      <p className="empty-state-description">{description}</p>
    </div>
  );
};

export default EmptyState;