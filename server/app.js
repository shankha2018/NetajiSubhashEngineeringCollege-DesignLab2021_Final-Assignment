const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const {MONGOURI} = require('./config/keys');

const app = express();
const PORT =  8080

// Mongodb connection
mongoose.connect(MONGOURI,{
    useNewUrlParser: true,
    useUnifiedTopology: true
});
mongoose.connection.on('connected',()=>{
    console.log(`Connected to MongoDB`);
});
mongoose.connection.on('error',(err)=>{
    console.log(`Error Connecting ${err}`);
});

// Registering the mongoose model
require('./models/user');

// registering the routes
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(require('./routes/auth'));
app.use(require('./routes/user'));
app.listen(PORT, ()=>{
    console.log(`Server is running on ${PORT}`)
})