import React from 'react';
import { Trash2 } from 'lucide-react';
import type { Transition, Status } from '../../types';

interface TransitionCardProps {
  transition: Transition;
  statuses: Status[];
  onDelete: (transitionId: string) => void;
}

export const TransitionCard: React.FC<TransitionCardProps> = ({
  transition,
  statuses,
  onDelete,
}) => {
  const fromStatus = statuses.find(s => s.id === transition.from);
  const toStatus = statuses.find(s => s.id === transition.to);

  return (
    <div className="item-card transitions">
      <div className="item-card-content">
        <div className="item-info">
          <p className="item-name">{transition.name}</p>
          <div className="transition-flow">
            <span className="transition-status">{fromStatus?.name}</span>
            <span className="transition-arrow">→</span>
            <span className="transition-status">{toStatus?.name}</span>
          </div>
        </div>
        <div className="item-actions">
          <button
            onClick={() => onDelete(transition.id)}
            className="delete-btn"
            title="Delete transition"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};