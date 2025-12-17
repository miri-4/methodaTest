import { useEffect } from 'react';
import { useConfigManager } from './hooks/useConfigManager';
import { Header } from './components/Header/Header';
import { Footer } from './components/Footer/Footer';
import { StatusPanel } from './components/StatusPanel/StatusPanel';
import { TransitionPanel } from './components/TransitionPanel/TransitionPanel';
import './App.css';

function App() {
  const {
    config,
    loading,
    statusInfo,
    fetchConfig,
    addStatus,
    deleteStatus,
    addTransition,
    deleteTransition,
    setInitialStatus,
    resetConfiguration,
  } = useConfigManager();

  // Load configuration on mount
  useEffect(() => {
    fetchConfig();
  }, [fetchConfig]);

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  return (
    <div className="min-h-screen">
      <Header
        title="Status Transition Manager"
        subtitle="Manage your workflow statuses and transitions"
      />

      <div className="main-container">
        <StatusPanel
          statuses={config.statuses}
          statusInfo={statusInfo}
          initialStatus={config.initialStatus}
          onAddStatus={addStatus}
          onDeleteStatus={deleteStatus}
          onSetInitialStatus={setInitialStatus}
        />

        <TransitionPanel
          transitions={config.transitions}
          statuses={config.statuses}
          onAddTransition={addTransition}
          onDeleteTransition={deleteTransition}
        />
      </div>

      <Footer onReset={resetConfiguration} />
    </div>
  );
}

export default App;