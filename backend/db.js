const mongoose = require('mongoose');
mongoose.set("strictQuery", false);

const mongoURI = 'mongodb+srv://admin:admin@cluster0.9wow4u6.mongodb.net/inotebook';


const connectToMongo = ()=> {

    mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true },(error)=> {
        if (error) {
            console.log(error.message);
        } else {
            console.log("Conected to mongo cloud successfully");
        }
    });
    
}

module.exports = connectToMongo;