const express = require('express');

const { PORT } = require('./constants.js');
const expressConfig = require('./config/expressConfig');
const handlebarsConfig = require('./config/handlebarsConfig.js');
const initDatabase = require('./config/databaseConfig.js');

const routes = require('./routes.js')

const app = express();

expressConfig(app);
handlebarsConfig(app); 

app.use(routes);

initDatabase()
    .then(() => {
        app.listen(PORT, () => console.log(`Application is running on port ${PORT}...`));
    })
    .catch(error => {
        console.log('Cannot connect database: ' + error.message);
    });