import Pusher from "pusher-js";
import serverConfig from "../env";
const pusher = new Pusher(serverConfig.pusher.key, {
  cluster: serverConfig.pusher.cluster,
});

pusher.connection.bind("connected", (data) => console.log(data));

export default pusher;
// importScripts("https://js.pusher.com/beams/service-worker.js");
