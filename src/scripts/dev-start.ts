import startWebsocket from "../server";
import spawnProcess from "../utils/spawnProcess";

function startDev () {
  startWebsocket();
  spawnProcess('web', 'yarn', ['start'], {});
}

startDev();
