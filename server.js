const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const dotenv = require('dotenv');
const colors = require('colors');
const dbConnect = require('./config/connectDB');
const path = require('path');
//config dotenv
dotenv.config();

//database call
dbConnect();
const app = express();

//Middlewares
app.use(express.json());
app.use(morgan('dev'))
app.use(cors())



const PORT = process.env.PORT || 5001;


//Routes
app.use('/api/v1/users', require('./routes/userRoute'))
//transaction route
app.use('/api/v1/transactions', require('./routes/transactionRoutes'))

//static files
app.use(express.static(path.join(__dirname, './client/build')))

app.get('*', (req, res) => { 
    res.sendFile(path.join(__dirname, './client/build/index.html'))
})

//Listening
app.listen(PORT, () => {
    console.log(`Serving on port ${PORT}`)
});

