const expressLoader = require('./express');
/**
 * @function init Sets up the server
 * @param app An express application
 */
async function init(app : any) {

    // log('setting up mongodb connection');
    // await mongoLoader();
  
    await expressLoader.load(app);
}

module.exports = {init};