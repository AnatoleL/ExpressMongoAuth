const express = require('express');
const loaders = require('./loaders');
const config = require('./config');

/**
 * @function startServer Starts the API server
 * 
 * It'll start by loading the configuration from the loaders (MongoDB, express middlwares, etc..)
 * and then start listening on the config port
 */
async function startServer() {
    const app : any = express();

    console.info(`Running loaders`);
    await loaders.init(app);

    app.listen(config.port, (err: Error) => {
        if (err)
            return console.error(err);

        console.info(`Listening on PORT ${config.port}`);
    });
}

startServer();