export interface EnvironmentConfigI {
  API_URL: string;
}

const environment: EnvironmentConfigI = {
  API_URL: String(import.meta.env.VITE_API_URL || ''),
};

export default environment;
