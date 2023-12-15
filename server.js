require('dotenv').config();
const express = require("express");
const bodyParser = require('body-parser');
const authenticationRoutes = require('./routes/authenticate.route');
const expressConfig = require('./config/express.config');

const app = express();

app.use(bodyParser.json());

// Apply Express.js configurations or middlewares
expressConfig(app);

// Apply route definitions
app.use('/api/uat/dynamic', authenticationRoutes);


app.listen(() => {
    console.log(`Server running at ${process.env.HOST_NAME}:${process.env.PORT}`)
})