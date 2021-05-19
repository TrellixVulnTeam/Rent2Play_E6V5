const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const AuthRoute = require('./routes/auth')
const CourtRoute = require('./routes/courtApi')
const CoachRoute = require('./routes/coachApi')
const ShopRoute = require('./routes/shopApi')
const BookingRoute = require('./routes/bookingApi')
const cookieParser = require('cookie-parser');
//const corsMiddleWare = require('./cors')


// set express app
const app = express();

//app.use(corsMiddleWare);

 app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    if (req.method === 'OPTIONS'){
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
        return res.status(200).json({})
    }
    next();
 });

// Connect to MongoDB
mongoose.connect('mongodb://admin:rent2play12345@cluster0-shard-00-00.fgyir.mongodb.net:27017,cluster0-shard-00-01.fgyir.mongodb.net:27017,cluster0-shard-00-02.fgyir.mongodb.net:27017/test?replicaSet=atlas-cnkwgs-shard-0&ssl=true&authSource=admin', 
{ useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true}).then(db => {
    console.log("Database connected");
  }).catch(error => console.log("Could not connect to mongo db " + error));
mongoose.Promise = global.Promise;

// Middleware
app.use(bodyParser.json());
app.use(cookieParser());

// Initialize routes
app.use('/api', CourtRoute);
app.use ('/api', CoachRoute);
app.use('/api', ShopRoute);
app.use('/payment', BookingRoute)
app.use('/api', AuthRoute);

//Error handling middleware
app.use(function(err, req, res, next){
    res.status(404).send(
        {error: err.message}
    ) 
})

// Listen for request
app.listen(process.env.port || 4000, function(){
    console.log("Now listening for requests");
});




