import express, {Express} from "express";

export class App {
  app: Express;
  port: number;

  constructor() {
    this.app = express();
    this.port = 8000;
  }

  async init() {
    this.app.listen(this.port, () => {
      console.log('server started');
    });
  }
}