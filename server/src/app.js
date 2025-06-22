// server/src/app.js
const express = require('express');
const morgan  = require('morgan');
const cors    = require('cors');
const dotenv  = require('dotenv');
const connectDB = require('./config/db');
const starshipRoutes = require('./routes/starship');
const path        = require('path');
const swaggerUi   = require('swagger-ui-express');
const YAML        = require('yamljs');

dotenv.config();
const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

// Load the YAML file that already lives at server/openapi.yml
const swaggerDoc = YAML.load(path.join(__dirname, '..', 'openapi.yml'));

// Serve both the raw JSON and the interactive UI
app.use('/openapi.json', (_, res) => res.json(swaggerDoc));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));

// mount routes
app.use('/starfleet/starships', starshipRoutes);

// only start the server if not required by tests
if (process.env.NODE_ENV !== 'test') {
  connectDB().then(() => {
    app.listen(process.env.PORT || 4000, () =>
      console.log(`🚀  Server on ${process.env.PORT || 4000}`)
    );
  });
}

module.exports = app;
