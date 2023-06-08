const express = require('express');
const { default: mongoose } = require('mongoose');
const dotenv = require('dotenv').config();

const app = express();

app.use(express.json());

const allowedDomains = process.env.ALLOWED_DOMAINS.split(',');

app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (allowedDomains.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PATCH, DELETE, PUT'
  );
  next();
});

app.use('/post', require('./routes/postData'));

app.use('/places', require('./routes/places-routes'));
app.use('/sites', require('./routes/site-routes'));
app.use('/booking', require('./routes/booking-routes'));
app.use('/payment', require('./routes/payment-routes'));

mongoose
  .connect(process.env.MONGO_DB_PASSWORD, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    const port = process.env.PORT || 5000;
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });

mongoose.connection.on('connected', () => {
  console.log('Connected to MongoDB Atlas');
});
