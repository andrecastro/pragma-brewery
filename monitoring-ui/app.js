const express = require('express');
const path = require('path');
const http = require('http');

const app = express();
const PORT = 3000
const MONITOR_AGENT_ADDR = process.env.MONITOR_AGENT_ADDR || 'ws://localhost:3001'

app.set('port', PORT);
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, '/public')));

/**
 * Provide the main page
 */
app.get('/', function (req, res) {
  res.render('index', { agentUrl: MONITOR_AGENT_ADDR })
});

/**
 * Create HTTP server and listen on provided port, on all network interfaces.
 */
const server = http.createServer(app);
server.listen(PORT);
server.on('listening', function () {
  var addr = server.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  console.log('Listening on ' + bind);
}
);

server.on('error', function () {
  console.log('Error');
}
);

module.exports = app;
