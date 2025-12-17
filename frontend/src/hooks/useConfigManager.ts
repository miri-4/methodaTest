import { useState, useCallback } from 'react';
import type { Configuration } from '../types';
import { configService, statusService, transitionService } from '../services/api';
import { getStatusInfo, statusNameExists, transitionNameExists, getRelatedTransitions } from '../utils/statusUtils';

export const useConfigManager = () => {
  const [config, setConfig] = useState<Configuration>({
    statuses: [],
    transitions: [],
    initialStatus: null,
  });
  const [loading, setLoading] = useState(true);

  // Fetch configuration from server
  const fetchConfig = useCallback(async () => {
    try {
      setLoading(true);
      const data = await configService.getConfig();
      setConfig(data);
    } catch (error) {
      console.error('Error fetching config:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  // Add status with validation
  const addStatus = useCallback(
    async (name: string) => {
      if (!name.trim()) return;

      if (statusNameExists(config.statuses, name)) {
        alert('A status with this name already exists.');
        return;
      }

      try {
        await statusService.addStatus(name);
        await fetchConfig();
      } catch (error) {
        console.error('Error adding status:', error);
      }
    },
    [config.statuses, fetchConfig]
  );

  // Delete status and related transitions
  const deleteStatus = useCallback(
    async (statusId: string) => {
      try {
        // Delete all transitions related to this status
        const relatedTransitions = getRelatedTransitions(config.transitions, statusId);
        for (const transition of relatedTransitions) {
          await transitionService.deleteTransition(transition.id);
        }

        // Delete the status itself
        await statusService.deleteStatus(statusId);
        await fetchConfig();
      } catch (error) {
        console.error('Error deleting status:', error);
      }
    },
    [config.transitions, fetchConfig]
  );

  // Add transition with validation
  const addTransition = useCallback(
    async (name: string, from: string, to: string) => {
      if (!name.trim() || !from || !to) return;
      if (from === to) return;

      if (transitionNameExists(config.transitions, name)) {
        alert('A transition with this name already exists.');
        return;
      }

      try {
        await transitionService.addTransition(name, from, to);
        await fetchConfig();
      } catch (error) {
        console.error('Error adding transition:', error);
      }
    },
    [config.transitions, fetchConfig]
  );

  // Delete transition
  const deleteTransition = useCallback(
    async (transitionId: string) => {
      try {
        await transitionService.deleteTransition(transitionId);
        await fetchConfig();
      } catch (error) {
        console.error('Error deleting transition:', error);
      }
    },
    [fetchConfig]
  );

  // Set initial status
  const setInitialStatus = useCallback(
    async (statusId: string) => {
      try {
        await statusService.setInitialStatus(statusId);
        await fetchConfig();
      } catch (error) {
        console.error('Error setting initial status:', error);
      }
    },
    [fetchConfig]
  );

  // Reset configuration
  const resetConfiguration = useCallback(async () => {
    if (window.confirm('Are you sure you want to reset all configuration?')) {
      try {
        // First delete all transitions
        for (const transition of config.transitions) {
          await transitionService.deleteTransition(transition.id);
        }

        // Then delete all statuses
        for (const status of config.statuses) {
          await statusService.deleteStatus(status.id);
        }

        // Finally reset the configuration on the server
        await configService.reset();
        await fetchConfig();
      } catch (error) {
        console.error('Error resetting configuration:', error);
        alert('Error resetting configuration. Please try again.');
      }
    }
  }, [config.transitions, config.statuses, fetchConfig]);

  // Get status info with metadata
  const statusInfo = getStatusInfo(config);

  return {
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
  };
};