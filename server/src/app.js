require('dotenv').config();
const express  = require('express');
const morgan   = require('morgan');
const cors     = require('cors');
const connectDB = require('./config/db');
const starshipRoutes = require('./routes/starship');

const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.use('/starfleet/starships', starshipRoutes);

app.get('/', (_, res) =>
  res.send('Welcome to the Starfleet Registry API')
);

connectDB().then(() => {
  const port = process.env.PORT || 4000;
  app.listen(port, () => console.log(`Server ready on port ${port}`));
});
