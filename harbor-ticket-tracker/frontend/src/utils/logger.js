// Simple logger utility
const logger = {
  error: (context, message, error) => {
    console.error(`[${context}] ${message}`, error);
  },
  warn: (context, message) => {
    console.warn(`[${context}] ${message}`);
  },
  info: (context, message) => {
    console.log(`[${context}] ${message}`);
  }
};

export default logger;
