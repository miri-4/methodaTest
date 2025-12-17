import type { Status, Transition, StatusInfo, Configuration } from '../types';

/**
 * Get all reachable statuses from the initial status
 * Uses BFS algorithm to traverse the transition graph
 */
export const getReachableStatuses = (config: Configuration): Set<string> => {
  if (!config.initialStatus) return new Set();

  const reachable = new Set<string>();
  const queue = [config.initialStatus];
  reachable.add(config.initialStatus);

  while (queue.length > 0) {
    const current = queue.shift()!;
    const outgoing = config.transitions.filter(t => t.from === current);

    for (const trans of outgoing) {
      if (!reachable.has(trans.to)) {
        reachable.add(trans.to);
        queue.push(trans.to);
      }
    }
  }

  return reachable;
};

/**
 * Get enhanced status information with metadata
 * Determines if status is initial, final, or orphan
 */
export const getStatusInfo = (config: Configuration): StatusInfo[] => {
  const reachable = getReachableStatuses(config);

  return config.statuses.map(status => {
    const isInitial = status.id === config.initialStatus;
    const isOrphan = !reachable.has(status.id);
    const isFinal = !config.transitions.some(t => t.from === status.id);

    return { ...status, isInitial, isOrphan, isFinal };
  });
};

/**
 * Check if status name already exists (case-insensitive)
 */
export const statusNameExists = (statuses: Status[], name: string): boolean => {
  return statuses.some(s => s.name.toLowerCase() === name.trim().toLowerCase());
};

/**
 * Check if transition name already exists (case-insensitive)
 */
export const transitionNameExists = (transitions: Transition[], name: string): boolean => {
  return transitions.some(t => t.name.toLowerCase() === name.trim().toLowerCase());
};

/**
 * Get all transitions related to a specific status (both as source and destination)
 */
export const getRelatedTransitions = (transitions: Transition[], statusId: string): Transition[] => {
  return transitions.filter(t => t.from === statusId || t.to === statusId);
};