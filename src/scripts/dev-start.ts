import startServer from '../server';
import spawnProcess from '../utils/spawnProcess';

const startDev = async () => {
  await startServer();
  spawnProcess('web', 'yarn', ['start'], {});
};

startDev();
