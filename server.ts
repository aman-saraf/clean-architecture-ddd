import 'reflect-metadata';
import bodyParser from 'body-parser';
import compression from 'compression';
import cors, { CorsOptions } from 'cors';
import dotenv from 'dotenv';
import express, { NextFunction, Request, Response } from 'express';
import helmet from 'helmet';
import path from 'path';
import { useContainer, useExpressServer } from 'routing-controllers';
import { Container } from 'typedi';
import { createPostgresDataSource } from './src/shared/infra/database/config';
import LOG from '@shared/infra/logger/logger';
import httpLogger from '@shared/infra/logger/httpLogger';
import { AfterVideoAppointmentCreatedHandler } from '@notification/subscriptions/videoBooking/afterVideoAppointmentCreatedHandler';
import { AfterVideoBookingCreatedHandler } from '@notification/subscriptions/videoBooking/afterVideoBookingCreatedHandler';
import { AfterVideoBookingDeclinedHandler } from '@notification/subscriptions/videoBooking/afterVideoBookingDeclinedHandler';
import { AfterVideoBookingReceivedHandler } from '@notification/subscriptions/videoBooking/afterVideoBookingReceivedHandler';
import { middleware } from 'supertokens-node/framework/express';
import { initialiseSuperTokens } from './src/shared/infra/supertokens/config';
import supertokens from 'supertokens-node';
import { AfterAppointmentCreatedHandler } from '@notification/subscriptions/booking/afterAppointmentCreatedHandler';
import { AfterBookingCreatedHandler } from '@notification/subscriptions/booking/afterBookingCreatedHandler';
import { AfterBookingDeclinedHandler } from '@notification/subscriptions/booking/afterBookingDeclinedHanlder';
import { AfterBookingConfirmedHandler } from '@notification/subscriptions/booking/afterBookingConfirmedHandler';

const user = (process.env.USER || process.env.USERNAME || '').toLowerCase();
const envPath = user ? `env/.env.${user}` : `env/.env.${process.env.ENV}`;
const result = dotenv.config({ path: envPath });

if (result.error) {
  LOG.error(result.error);
  throw Error('Failure while loading the environment variables');
}

useContainer(Container);

initialiseSuperTokens();

const datasource = createPostgresDataSource();
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use((request: Request, response: Response, next: NextFunction) => {

  const requestedOrigin = request.get('origin')

  let corsOptions: CorsOptions

  if (requestedOrigin === process.env.VET_PORTAL_BASE_URL) {
    corsOptions = {
      origin: process.env.VET_PORTAL_BASE_URL,
      allowedHeaders: ['content-type', ...supertokens.getAllCORSHeaders()],
      credentials: true
    }
  } else {
    corsOptions = {
      origin: '*'
    }
  }

  cors(corsOptions)(request, response, next)

});
app.use(middleware());
app.use(compression());
app.use(helmet());
app.use(httpLogger);

useExpressServer(app, {
  controllers: [path.join(__dirname, '/src/modules/**/controller/*.ts')]
});

const port = process.env.APP_PORT || 3000;

const initialiseDatabase = async () => {
  const ds = await datasource.initialize();

  if (!ds.isInitialized) {
    throw new Error('db is not initialized');
  }

  LOG.info('db is initialized');
  Container.set('datasource', ds);

  LOG.info('------ Running migrations --------');
  const migrations = await ds.runMigrations();
  LOG.info('------ %d migrations complete ---------', migrations.length);

  return;
};

try {
  initialiseDatabase().then(() => {
    app.listen(port, (): void => {
      Container.get(AfterBookingCreatedHandler);
      Container.get(AfterBookingDeclinedHandler);
      Container.get(AfterAppointmentCreatedHandler);
      Container.get(AfterBookingConfirmedHandler);

      Container.get(AfterVideoAppointmentCreatedHandler);
      Container.get(AfterVideoBookingCreatedHandler);
      Container.get(AfterVideoBookingDeclinedHandler);
      Container.get(AfterVideoBookingReceivedHandler);
      LOG.info('Connected successfully on port %d', port);
    });
  });
} catch (error: any) {
  LOG.error('Error occured: %s', error.message);
}
