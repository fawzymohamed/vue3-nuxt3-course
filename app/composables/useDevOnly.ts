/**
 * Simple flag to check if we're in development mode
 * Can be used in components for conditional rendering
 */
export const useDevOnly = () => {
  return {
    isDev: import.meta.env.DEV,
    isProd: import.meta.env.PROD,
  };
};
