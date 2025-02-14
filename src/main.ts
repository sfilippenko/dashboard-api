import {App} from "./app.js";
import {LoggerService} from "./logger/logger-service.js";

const main = async () => {
  const app = new App({
    logger: new LoggerService(),
  });
  await app.init();
}

main();