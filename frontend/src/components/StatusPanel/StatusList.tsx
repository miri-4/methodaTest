import React from 'react';
import type { StatusInfo } from '../../types';
import { StatusCard } from './StatusCard';

interface StatusListProps {
  statuses: StatusInfo[];
  onDelete: (statusId: string) => void;
}

export const StatusList: React.FC<StatusListProps> = ({ statuses, onDelete }) => {
  if (statuses.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-icon">◎</div>
        <p className="empty-text">No statuses yet</p>
      </div>
    );
  }

  return (
    <div className="items-list">
      {statuses.map(status => (
        <StatusCard key={status.id} status={status} onDelete={onDelete} />
      ))}
    </div>
  );
};