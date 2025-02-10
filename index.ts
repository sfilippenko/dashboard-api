import express, {Request, Response, NextFunction} from 'express';

const port = 8000;

const app = express();

app.get('/hello', (req, res) => {
  res.send('Hello World!');
});

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  res.status(401).send(err.message);
})

app.listen(port, () => {
  console.log('server started');
});