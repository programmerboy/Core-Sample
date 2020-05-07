import { COMMON_ENV_VARIABLES } from './common.env.variables';

export const environment = {
  production: true,
  API_URL: '/api',
  ...COMMON_ENV_VARIABLES
};
