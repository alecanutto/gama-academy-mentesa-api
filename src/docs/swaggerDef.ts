import { PORT } from '@/config';
import { version } from '../../package.json';

const swaggerDef = {
  openapi: '3.0.0',
  info: {
    title: 'mente-sa API documentation',
    version,
    license: {
      name: 'MIT',
      url: 'https://github.com/alecanutto/gama-academy-mentesa-api.git',
    },
  },
  servers: [
    {
      url: `http://localhost:${PORT}/v1`,
    },
  ],
};

module.exports = swaggerDef;
