import React from 'react';
import type { Status, Transition } from '../../types';
import { TransitionList } from './TransitionList';
import { AddTransitionForm } from './AddTransitionForm';

interface TransitionPanelProps {
  transitions: Transition[];
  statuses: Status[];
  onAddTransition: (name: string, from: string, to: string) => void;
  onDeleteTransition: (transitionId: string) => void;
}

export const TransitionPanel: React.FC<TransitionPanelProps> = ({
  transitions,
  statuses,
  onAddTransition,
  onDeleteTransition,
}) => {
  return (
    <div className="panel">
      <div className="panel-header transitions">
        <div className="panel-icon">→</div>
        <div className="panel-header-content">
          <h2>Transitions</h2>
          <p>Define status transitions</p>
        </div>
      </div>

      <div className="panel-content">
        <TransitionList
          transitions={transitions}
          statuses={statuses}
          onDelete={onDeleteTransition}
        />
        {statuses.length > 0 ? (
          <AddTransitionForm statuses={statuses} onAdd={onAddTransition} />
        ) : (
          <div className="alert-box">Create statuses first</div>
        )}
      </div>
    </div>
  );
};