const express = require('express');
const cors = require('cors')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const http = require('http');
const path = require('path');

require('dotenv').config();

const app = express();
const server = http.createServer(app);
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

const uri = process.env.ATLAS_URI;
mongoose.connect(process.env.MONGODB_URI || uri, {
    useNewUrlParser: true,
    userCreateIndex: true,
    useUnifiedTopology: true
});

const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection established succesfully");
});

const postRouter = require('./routes/post.route');
const signInRouter = require('./routes/signIn.route');
const messageRouter = require('./routes/message.route');

app.use('/post', postRouter);
app.use('/account', signInRouter);
app.use('/messages', messageRouter);

//Serve static assets if in production
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../build'))); //RECHECK THIS.. not sure if this path is exactly correct
     app.get('*', (req, res) => {
         res.sendFile(path.resolve(__dirname, '../build', 'index.html'));
     });
}

server.listen(PORT, () => {
    console.log(`Server is listening on port: ${PORT}`);
});