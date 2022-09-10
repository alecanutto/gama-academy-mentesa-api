import swaggerJSDoc from 'swagger-jsdoc';
import { version } from '../../package.json';

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Mente SÃ - API',
    version,
    description: 'Aplicação Rest API utilizando Node.js, TypeScript, Prisma, MySQL e Express API Server.',
    license: {
      name: 'Licensed Under MIT',
      url: 'https://spdx.org/licenses/MIT.html',
    },
    contact: {
      name: 'Alessandra Canuto',
      url: 'https://github.com/alecanutto/gama-academy-mentesa-api.git',
    },
  },
  servers: [
    {
      url: 'http://localhost:3000',
      description: 'Development server',
    },
  ],
};

const options = {
  swaggerDefinition,

  // Paths to files containing OpenAPI definitions
  // apis: ['**/*.ts'],
  apis: ['swagger.yaml'],
};

export const swaggerSpec = swaggerJSDoc(options);