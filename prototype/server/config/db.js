// Export mongoose
const  mongoose = require("mongoose");

//Assign MongoDB connection string to Uri and declare options settings
var  dbUri = "mongodb+srv://BU411project:BU411project@bu411cluster.avt9v.mongodb.net/Users?retryWrites=true&w=majority"

// Declare a variable named option and assign optional settings
const  options = {
useNewUrlParser:  true,
useUnifiedTopology:  true
};

// Connect MongoDB Atlas using mongoose connect method
mongoose.connect(dbUri, options).then(() => {
    console.log("Database connection established!");
}, err  => {
{
    console.log("Error connecting Database instance due to:", err);
}});
