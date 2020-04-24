const mongoose = require('mongoose');
const connectionString = 'mongodb://localhost:27017/lets-eat';
const configOptions = {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
    useCreateIndex: true,
}

mongoose.connect(connectionString, configOptions)
.then(()=> console.log('MongoDB connected successfully'))
.catch((err) => console.log(`MongoDB connection error: ${err}`))

module.exports = {
    Recipe: require('./Recipe'),
    User: require('./User')
}