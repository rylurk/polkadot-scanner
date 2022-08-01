import express, { Request, Response } from 'express';
import basicAuth from 'express-basic-auth';
import next from 'next';

const port = process.env.PORT || 8080;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  server.use(
    basicAuth({
      challenge: true,
      users: { user: 'supersecret' },
    })
  );

  server.all('*', (req: Request, res: Response) => {
    return handle(req, res);
  });

  server.listen(port, () => {
    console.log(`> Ready on http://localhost:${port}`);
  });
});
