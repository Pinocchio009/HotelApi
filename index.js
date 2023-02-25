const express = require('express');
const {json} = require('express');
const connect = require('./src/config/db')
const RoomRoutes = require('./src/Router/RoomRoutes');
const userRoutes = require('./src/Router/userRoutes')
require('dotenv').config();

connect()

const app = express();
app.use(json());
app.use('/room', RoomRoutes)
app.use('/', userRoutes);
const PORT = process.env.PORT || 3500;
app.get('/', (req, res)=> {
    res.send('i am coming')
});

app.listen(PORT, ()=> console.log(`Server is listening on port ${PORT}`))