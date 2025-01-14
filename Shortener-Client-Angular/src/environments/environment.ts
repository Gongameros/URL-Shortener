// src/environments/environment.ts
import { Environment } from './environment.interface';

export const environment: Environment = {
  production: false,
  apiLinkUrl: 'http://localhost:5107/api/Links',
  apiUserUrl: 'http://localhost:5053/api/Authentication',
  apiUrl: 'http://localhost:5252/api',
};
