const express = require('express');
const path = require('path');
const app = express();
const {createProxyMiddleware} = require('http-proxy-middleware');


// Retrieve command line arguments
const args = process.argv.slice(2); // Exclude 'node' and 'web.js' from arguments

let configserver = {
    port_web:3000,
    port_api:3001,
}

// Check if a parameter is provided
if (args.length > 0) {
    // Access the parameter (e.g., 'vm')
    const parameter = args[0];

    // Use the parameter as needed
    console.log(`Parameter specified: ${parameter}`);
    if(parameter === "vm"){
        console.log("Starting in VM environnement")
        configserver = {
            port_web: 80,
            port_api:10002
        }
    }
} else {
    // No parameter provided
    console.log('No parameter specified.');
}

console.log("Starting with parameters : ",configserver);


app.use(express.static(path.join(__dirname, 'build')));




const logProxyRequest = (proxyReq, req, res) => {
    // Construct the full URL being proxied
    const fullUrl = `${proxyReq.agent.protocol}//${proxyReq._headers.host}${proxyReq.path}`;

    // Log the details
    console.log(`[${new Date().toLocaleString()}] Proxying request: ${req.method} ${fullUrl}`);
};


// Reverse proxy for /api/
const apiProxy = createProxyMiddleware('/api', {
    target: 'http://localhost:'+configserver.port_api,
    changeOrigin: true,
    onProxyReq: logProxyRequest
});

app.use('/api', apiProxy);

// Reverse proxy for /socketio/
const socketProxy = createProxyMiddleware('/socketio', {
    target: 'http://localhost:'+configserver.port_api,
    changeOrigin: true,
    pathRewrite: {
        '^/socketio': 'socket.io/'  // Remove the '/socketio' prefix
    },
    ws:true,
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
app.listen(configserver.port_web, () => {
	console.log('Server running on port : ',configserver.port_web);

});
