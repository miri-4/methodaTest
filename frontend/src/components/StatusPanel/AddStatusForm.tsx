import React, { useState } from 'react';
import { Plus } from 'lucide-react';

interface AddStatusFormProps {
  onAdd: (name: string) => void;
}

export const AddStatusForm: React.FC<AddStatusFormProps> = ({ onAdd }) => {
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = () => {
    setError('');

    if (name.trim() === '') {
        setError('Status name cannot be empty');
        return;
      }
  
    onAdd(name);
    setName('');
  };

  return (
    <div className="form-section statuses">
      <label className="form-label">Add New Status</label>

      {error && (
        <div className="error-message">
          {error}
        </div>
      )}

      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        onKeyPress={(e) => e.key === 'Enter' && handleSubmit()}
        placeholder="Status name..."
        className="form-input"
      />
      <button onClick={handleSubmit} className="form-submit">
        <Plus size={18} /> Add Status
      </button>
    </div>
  );
};