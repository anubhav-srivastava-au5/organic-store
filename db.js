const mongoose = require("mongoose");

mongoose.connect(process.env.MONGODB_URI.replace("<password>", process.env.MONGODB_PASSWORD),
{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
})
.then(function(){
    console.log("Database connected");
})
.catch(function(err){
    console.log(err.message)
});