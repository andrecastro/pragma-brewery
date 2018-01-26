const WebSocket = require('ws');
const MonitoringService = require('./service/monitoring');
const HealthChecker = require('./service/healthChecker');

const port = 3001
const targetEndpoint = process.env.TARGET_ENDPOINT || 'http://truck-api:3002/metrics'
const intervalInSeconds = process.env.INTERVAL_IN_SECONDS || 5

/**
 * Create web socket to push data to clients
 */
const wss = new WebSocket.Server({ port: port });

/**
 * The monitoring service responsible for call the target service
 */
const service = new MonitoringService(targetEndpoint, intervalInSeconds * 1000);

/**
 * The service responsible to check the container
 */
var healthChecker = new HealthChecker();

/**
 * When the client connect, send the last data available
 */
wss.on('connection', (ws, req) => {

  var lastData = service.lastData();
  console.log('Last data')
  console.log(lastData);
  if (lastData) {
    var checkedContainers = healthChecker.check(lastData.containers);
    ws.send(JSON.stringify({ containers: checkedContainers }));
  }

  ws.on('error', () => console.log('Error'));

  ws.on('close', () => console.log('Closing'));
 
});

/**
 * Broadcast the data to all clients with open connection 
 */
wss.broadcast = (data) => {
  wss.clients.forEach(function each(client) {
    if (client.readyState === WebSocket.OPEN) {
      client.send(data);
    }
  });
}

/**
 * 
 * When the monitoring service gets the data from the ginven endpoint, it will broadcast to all
 * clients connected.
 */
service.start((err, data) => {
  if (err) {
    return;
  }

  var checkedContainers = healthChecker.check(data.containers);
  wss.broadcast(JSON.stringify({ containers: checkedContainers }));  
})
