import React from 'react';
import type { Status } from '../../types';

interface InitialStatusSelectorProps {
  statuses: Status[];
  currentInitialStatus: string | null;
  onSetInitial: (statusId: string) => void;
}

export const InitialStatusSelector: React.FC<InitialStatusSelectorProps> = ({
  statuses,
  currentInitialStatus,
  onSetInitial,
}) => {
  if (statuses.length === 0) return null;

  return (
    <div className="form-section statuses">
      <label className="form-label">Initial Status</label>
      <select
        value={currentInitialStatus || ''}
        onChange={(e) => onSetInitial(e.target.value)}
        className="form-select"
      >
        {statuses.map(status => (
          <option key={status.id} value={status.id}>
            {status.name}
          </option>
        ))}
      </select>
    </div>
  );
};