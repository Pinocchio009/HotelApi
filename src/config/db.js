const mongoose = require('mongoose');
const {config} = require('dotenv');
config();

mongoose.set('strictQuery', true);
async function connect (uri) {
    try {
        mongoose.connect(uri || process.env.MONGO_DB_LOCAL)
        
        console.log('connected to db')
    } catch (error) {
        console.log('db connection stopped')
    }
}

module.exports = connect;