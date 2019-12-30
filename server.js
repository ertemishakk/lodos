const express = require('express');
const connectDB = require('./db')
const users = require('./api/users')
const bodyParser = require('body-parser')
const cors = require('cors')
const posts = require('./api/posts')




const app = express();

app.use(cors())

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

connectDB()



app.use('/api/users', users)
app.use('/api/posts', posts)


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))