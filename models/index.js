const mongoose =require('mongoose');


const connectionString = 'mongodb://localhost:27017/Lets-eat'
const configOption ={
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex:true,
    useUnifiedTopology:true,
}

mongoose.connect(connectionString,configOption)
    .then(()=>{console.log('MongoDB conntected sucessfully')})
    .catch((err)=>{console.log(`MongoDB connection error: ${err}`)})


module.exports = {
    Recipe: require('./Recipe'),
    User: require('./User')
}