import startDevServer from '../server';
import spawnProcess from '../utils/spawnProcess';

const startDev = async () => {
  await startDevServer();
  spawnProcess('web', 'yarn', ['start'], {});
};

startDev();
