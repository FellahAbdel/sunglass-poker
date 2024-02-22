const express = require('express');
const router = express.Router();

// Define your API routes here

app = express();
port = 3001;
module.exports = router;

app.get('/', (req,res) => {
    res.send('welcome to my server');
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})