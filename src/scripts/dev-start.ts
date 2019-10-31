import start from "../server";
import spawnProcess from "../utils/spawnProcess";

function startDev () {
  start();
  spawnProcess('web', 'yarn', ['start'], {});
}

startDev();
