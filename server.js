require('dotenv').config();
const express = require("express");
const expressConfig = require('./config/express.config');
const app = express();

//Routes defining
const router = require('./routes/index');

// Apply Express.js configurations or middlewares
expressConfig(app);

app.use('/api/uat/dynamic', router);


app.listen(process.env.PORT,() => {
    console.log(`Server running at ${process.env.HOST_NAME}:${process.env.PORT}`)
})