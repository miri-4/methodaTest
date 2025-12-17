import React from 'react';

interface FooterProps {
  onReset: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onReset }) => {
  return (
    <div className="app-footer">
      <button onClick={onReset} className="reset-btn">
        Reset Configuration
      </button>
    </div>
  );
};