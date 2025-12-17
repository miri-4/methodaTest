import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import type { Status } from '../../types';

interface AddTransitionFormProps {
  statuses: Status[];
  onAdd: (name: string, from: string, to: string) => void;
}

export const AddTransitionForm: React.FC<AddTransitionFormProps> = ({
  statuses,
  onAdd,
}) => {
  const [name, setName] = useState('');
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = () => {
    setError('');

    if (name.trim() === '') {
      setError('Transition name cannot be empty');
      return;
    }

    if (statuses.length < 2) {
      setError('You need at least 2 statuses to create a transition');
      return;
    }

    if (from === to && from !== '') {
      setError('A transition cannot go from a status to itself');
      return;
    }

    onAdd(name, from, to);
    setName('');
    setFrom('');
    setTo('');
  };

  const isDisabled = statuses.length < 2;

  return (
    <div className="form-section transitions">
      <label className="form-label">Add New Transition</label>
      
      {error && (
        <div className="error-message">
          {error}
        </div>
      )}

      {isDisabled && (
        <div className="alert-box">
          Create at least 2 statuses first
        </div>
      )}

      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Transition name..."
        className="form-input"
        disabled={isDisabled}
      />
      <select
        value={from}
        onChange={(e) => setFrom(e.target.value)}
        className="form-select"
        disabled={isDisabled}
      >
        <option value="">From status...</option>
        {statuses.map(status => (
          <option key={status.id} value={status.id}>
            {status.name}
          </option>
        ))}
      </select>
      <select
        value={to}
        onChange={(e) => setTo(e.target.value)}
        className="form-select"
        disabled={isDisabled}
      >
        <option value="">To status...</option>
        {statuses.map(status => (
          <option key={status.id} value={status.id}>
            {status.name}
          </option>
        ))}
      </select>
      <button 
        onClick={handleSubmit} 
        className="form-submit"
        disabled={isDisabled}
      >
        <Plus size={18} /> Add Transition
      </button>
    </div>
  );
};