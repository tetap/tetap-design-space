import path from 'path';

const config = { port: 39090, app: './', db: '' };

export const updateConfig = (argv: string[]) => {
  for (let i = 0; i < argv.length; i++) {
    try {
      const config = JSON.parse(argv[i]);
      if (config.port) {
        config.port = parseInt(config.port);
      }
      if (config.app) {
        config.app = config.app.replace(/\\/g, '/');
        config.db = path.normalize(`${config.app}/database/app.db`);
      }
      return config;
    } catch (error) {}
  }
};

export default config;
