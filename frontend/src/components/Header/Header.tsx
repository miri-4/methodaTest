import React from 'react';

interface HeaderProps {
  title: string;
  subtitle: string;
}

export const Header: React.FC<HeaderProps> = ({ title, subtitle }) => {
  return (
    <div className="app-header">
      <h1 className="app-title">{title}</h1>
      <p className="app-subtitle">{subtitle}</p>
    </div>
  );
};