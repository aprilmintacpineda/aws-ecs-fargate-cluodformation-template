import fastify from 'fastify';
import { WebSocketServer } from 'ws';

const fastifyServer = fastify();

function overloadCpu () {
  // this will cause the CPU to overload, triggering the autoscaling
  const max = 10000000;
  let sum = 0;
  for (let a = 1; a <= max; a++) sum += a;
  console.log(sum);
}

fastifyServer.get('/', async (request, reply) => {
  console.log('home request');

  overloadCpu();

  reply.status(200).send({
    params: request.params,
    query: request.query,
    message: 'Hello world!!!!'
  });
});

fastifyServer.get('/health', async (request, reply) => {
  console.log('health check');
  reply.status(200).send('Healthy');
});

fastifyServer.listen(3000, '0.0.0.0', (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }

  console.log(`fastifyServer listening at ${address}`);
});

// websocket

const wsServer = new WebSocketServer({
  server: fastifyServer.server
});

type WebSocketMessage = {
  action: string;
};

wsServer.on('connection', socket => {
  console.log('client connected');

  socket.on('message', payload => {
    const message: WebSocketMessage = JSON.parse(payload.toString());

    if (message.action === 'ping') {
      socket.send(
        JSON.stringify({
          action: 'pong'
        })
      );
    }

    console.log('message', message);
  });

  socket.on('close', () => {
    console.log('client disconnected');
  });
});
