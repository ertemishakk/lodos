const express = require('express');
const connectDB = require('./db')
const users = require('./api/users')
const bodyParser = require('body-parser')
const cors = require('cors')
const posts = require('./api/posts')
const http = require("http");
const app = express();
const path = require('path')
const passport = require('passport')


app.use(cors())



app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

connectDB()


const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => console.log(`Server running on port ${PORT}`))



const socketio = require('socket.io')
const io = socketio(server)

app.use(passport.initialize())
require('./config/passport')(passport)



const questions = require('./api/questions')(io)

app.use('/api/users', users)
app.use('/api/posts', posts)
app.use('/api/questions', questions)


if(process.env.NODE_ENV==='production'){
    app.use(express.static(`${__dirname}/client/build`))


    app.get('*', (req, res) => {
        res.sendFile('/client/build/index.html', { root: __dirname }, (err) => {
            if (err) {
                res.status(err.status).end();
            }
        });
    }
    )
    
}
