const mongoose = require('mongoose');

const dbConnection = async () => {
    try {
        const result = await mongoose.connect(process.env.CONNECTION_URI)
        console.log(`DB-Connection-Host: ${result.connection.host} \nDB-Name: ${result.connection.name}`);
        console.log("MongoDB Connection Established ✅")
    } catch (error) {
        console.log(error);
        process.exit(1)
    }
}

module.exports = dbConnection;

// mongoose.connect(process.env.CONNECTION_URI,{dbName: "Notes"})  // You can use this method as well to connect to a specific DB in mongoose