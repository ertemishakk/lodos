const mongoose = require('mongoose');
const db = require('./config/keys').mongoURI;

const connectDB = async () => {
    try {
        await mongoose.connect(db, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useFindAndModify: true,
            useUnifiedTopology: true
        })

        console.log('Database Connected')
    }
    catch (err) {
        console.log(err);
        process.exit(1)
    }
}
module.exports = connectDB;