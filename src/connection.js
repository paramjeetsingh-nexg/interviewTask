const mongoose = require("mongoose");
const colors = require("colors")

new mongoose.connect("mongodb+srv://Paramjeet:NexgenAccount0987@cluster0.5fskd.mongodb.net/?retryWrites=true&w=majority", {
    useNewUrlParser: true,  
    useUnifiedTopology: true,
}).then(() => {
    console.log("connection with database is successful..".cyan);
}).catch((error) => {
    console.log("Connection error...!".red.bold);
})