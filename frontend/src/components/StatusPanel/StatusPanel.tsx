import React from 'react';
import type { Status, StatusInfo } from '../../types';
import { StatusList } from './StatusList';
import { AddStatusForm } from './AddStatusForm';
import { InitialStatusSelector } from './InitialStatusSelector';

interface StatusPanelProps {
  statuses: Status[];
  statusInfo: StatusInfo[];
  initialStatus: string | null;
  onAddStatus: (name: string) => void;
  onDeleteStatus: (statusId: string) => void;
  onSetInitialStatus: (statusId: string) => void;
}

export const StatusPanel: React.FC<StatusPanelProps> = ({
  statuses,
  statusInfo,
  initialStatus,
  onAddStatus,
  onDeleteStatus,
  onSetInitialStatus,
}) => {
  return (
    <div className="panel">
      <div className="panel-header statuses">
        <div className="panel-icon">◎</div>
        <div className="panel-header-content">
          <h2>Statuses</h2>
          <p>Define your workflow statuses</p>
        </div>
      </div>

      <div className="panel-content">
        <StatusList statuses={statusInfo} onDelete={onDeleteStatus} />
        <AddStatusForm onAdd={onAddStatus} />
        <InitialStatusSelector
          statuses={statuses}
          currentInitialStatus={initialStatus}
          onSetInitial={onSetInitialStatus}
        />
      </div>
    </div>
  );
};