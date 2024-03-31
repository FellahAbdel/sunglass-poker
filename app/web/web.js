const express = require('express');
const path = require('path');
const app = express();
const session = require('express-session');
const MemoryStore = require('memorystore')(session);


app.use(express.static(path.join(__dirname, 'public/')));

const myStore = new MemoryStore({
    checkPeriod: 3 // prune expired entries every 24h
 });
/** Paramètres de session
 * 
 * 
*/
const Middleware = session({
    secret:'secretKeyForSession',
    name:'SunglassPokerSession',
    credentials:'include',
    secure:true,
    resave: true,
    proxy:true,
    store:myStore,
    saveUninitialized: true,
    cookie: {
        secure:true,
        maxAge: 1e7, // 10 seconds
        sameSite:'none',
    },
});
app.use(Middleware);


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
	console.log('Server running on port : 3000');

});
