import React from 'react';
import type { Transition, Status } from '../../types';
import { TransitionCard } from './TransitionCard';

interface TransitionListProps {
  transitions: Transition[];
  statuses: Status[];
  onDelete: (transitionId: string) => void;
}

export const TransitionList: React.FC<TransitionListProps> = ({
  transitions,
  statuses,
  onDelete,
}) => {
  if (transitions.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-icon">→</div>
        <p className="empty-text">No transitions yet</p>
      </div>
    );
  }

  return (
    <div className="items-list">
      {transitions.map(transition => (
        <TransitionCard
          key={transition.id}
          transition={transition}
          statuses={statuses}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};