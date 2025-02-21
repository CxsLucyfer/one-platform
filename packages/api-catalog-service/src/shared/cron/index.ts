import { Agenda } from 'agenda';
import Logger from '../../lib/logger';
import database from '../../setup/database';
import { MONGO_URL } from '../../setup/env';
import checkAPIHash from './cron';

export default function initializeAgenda(): void {
  Logger.info('SETUP - Agenda for cron scripts..\n');
  const agenda = new Agenda({
    db: {
      address: MONGO_URL,
    },
    defaultConcurrency: 1,
  });

  agenda.define('api-sync-hash', async () => {
    await checkAPIHash();
  });

  agenda.on('ready', () => {
    /* Start the agenda */
    agenda.start();
    /* Schedule the jobs */
    agenda.every('12 hours', 'api-sync-hash');
  });
}

if (require.main === module) {
  (async () => {
    /* Setup database connection */
    await database();
    /* Setup agenda */
    initializeAgenda();
  })();
}
