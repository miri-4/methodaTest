import React from 'react';
import { Trash2 } from 'lucide-react';
import type { StatusInfo } from '../../types';

interface StatusCardProps {
  status: StatusInfo;
  onDelete: (statusId: string) => void;
}

export const StatusCard: React.FC<StatusCardProps> = ({ status, onDelete }) => {
  return (
    <div className="item-card statuses">
      <div className="item-card-content">
        <div className="item-info">
          <p className="item-name">{status.name}</p>
          <div className="item-meta">
            {status.isInitial && (
              <span className="status-badge initial">⚡ Initial</span>
            )}
            {status.isFinal && (
              <span className="status-badge final">✓ Final</span>
            )}
            {status.isOrphan && (
              <span className="status-badge orphan">⚠ Orphan</span>
            )}
          </div>
        </div>
        <div className="item-actions">
          <button
            onClick={() => onDelete(status.id)}
            className="delete-btn"
            title="Delete status"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};