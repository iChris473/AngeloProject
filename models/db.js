const mongoose = require("mongoose");

mongoose.connect('mongodb+srv://ichris:uRltYApIKnACkOXK@cluster0.rpaco.mongodb.net/nairacity?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));
db.once('open', () => console.log("MongoDB running..."))


// 

// mongodb://ichris:uRltYApIKnACkOXK@cluster0-shard-00-00-zcbag.mongodb.net:27017,cluster0-shard-00-01-zcbag.mongodb.net:27017,cluster0-shard-00-02-xvnqv.mongodb.net:27017/zcbag?ssl=true&replicaSet=Cluster0-shard-0&authSource=test&retryWrites=true&w=majority