import axios from 'axios';
import type { Status, Transition, Configuration } from '../types';

const API_URL = 'http://localhost:5000/api';

// Configuration API calls
export const configService = {
  async getConfig(): Promise<Configuration> {
    const response = await axios.get(API_URL + '/config');
    return response.data;
  },

  async reset(): Promise<void> {
    await axios.post(API_URL + '/reset');
  },
};

// Status API calls
export const statusService = {
  async addStatus(name: string): Promise<Status> {
    const response = await axios.post(API_URL + '/statuses', { name });
    return response.data;
  },

  async deleteStatus(statusId: string): Promise<void> {
    await axios.delete(API_URL + `/statuses/${statusId}`);
  },

  async setInitialStatus(statusId: string): Promise<void> {
    await axios.put(API_URL + '/initial-status', { statusId });
  },
};

// Transition API calls
export const transitionService = {
  async addTransition(name: string, from: string, to: string): Promise<Transition> {
    const response = await axios.post(API_URL + '/transitions', {
      name,
      from,
      to,
    });
    return response.data;
  },

  async deleteTransition(transitionId: string): Promise<void> {
    await axios.delete(API_URL + `/transitions/${transitionId}`);
  },
};