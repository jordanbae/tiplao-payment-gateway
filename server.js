require('dotenv').config();
const express = require("express");
const bodyParser = require('body-parser');
const authenticationRoutes = require('./app/Routes/authenticate.route');
const expressConfig = require('./Config/express.config');

const app = express();

app.use(bodyParser.json());

// Apply Express.js configurations
expressConfig(app);

// Apply route definitions
app.use('/api/uat/dynamic', authenticationRoutes);
app.use('/', indexRouter);


app.listen(PORT, HOST_NAME, () => {
    console.log(`Server running at ${process.env.HOST_NAME}:${process.env.PORT}`)
})