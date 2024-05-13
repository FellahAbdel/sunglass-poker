const express = require('express');
const path = require('path');
const app = express();
const {createProxyMiddleware} = require('http-proxy-middleware');

app.use(express.static(path.join(__dirname, 'build')));

const logProxyRequest = (proxyReq, req, res) => {
    // Construct the full URL being proxied
    const fullUrl = `${proxyReq.agent.protocol}//${proxyReq._headers.host}${proxyReq.path}`;

    // Log the details
    console.log(`[${new Date().toLocaleString()}] Proxying request: ${req.method} ${fullUrl}`);
};


// Reverse proxy for /api/
const apiProxy = createProxyMiddleware('/api', {
    target: 'http://localhost:10002',
    changeOrigin: true,
    onProxyReq: logProxyRequest
});

app.use('/api', apiProxy);

// Reverse proxy for /socketio/
const socketProxy = createProxyMiddleware('/socketio', {
    target: 'http://localhost:10002',
    changeOrigin: true,
    pathRewrite: {
        '^/socketio': 'socket.io/'  // Remove the '/socketio' prefix
    },
//    ws:true,
    onProxyReq: logProxyRequest
});

app.use('/socketio', socketProxy);

app.use((err,req,res,next) => {
	console.error(err.stack);
	res.status(500).send('Internal Server error (moi)');
});

//app.get('*/static/js/main.78cd9e95.js', function (req,res) {
//	res.sendFile(path.join(__dirname,'build','/static/js/main.78cd9e95.js'));
//});

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});
app.listen(3000, () => {
	console.log('Server running on port : 80');

});
