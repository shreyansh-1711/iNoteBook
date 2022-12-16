const mongoose = require('mongoose')
const mongoURI = "mongodb://localhost:27017"

const connectTOMongo = () => {
    mongoose.connect(mongoURI, ()=>{
        console.log("Connected");
    })
}

module.exports = connectTOMongo;