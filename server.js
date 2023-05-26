const express = require("express");
// const { MongoClient, ObjectId } = require("mongodb");
const dotenv = require("dotenv").config();
const dbConnection = require("./config/dbConnection")

// Routes Imports
const contactRouter = require("./routes/contactsRoute");
const userRouter = require("./routes/usersRoute");

// Global Middleware Imports
const errorMiddleware = require("./middlewares/errorHandler")

const app = express();
const PORT = process.env.PORT || 5000;

dbConnection();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/contact", contactRouter);
app.use("/api/users", userRouter);
app.use(errorMiddleware)


app.listen(PORT, () => (
    console.log(`Server Listening on port ---> ${PORT}`)
))

// const {add, subtract, name} = require("./awein")
// add(2,3);
// subtract(10,5)
// console.log(name)

// const client = new MongoClient(process.env.CONNECTION_URI)

// const connectMongo = async() => {

//     try {

//         await client.connect();
//         console.log("Connected to Mongo")
//         const collection = client.db("mongo_crud_practice").collection("crud_data")

//         // const data = await collection.insertOne(
//         //     {
//         //         name: "Muzammil",
//         //         data: [{
//         //             _id: new ObjectId(),
//         //             age: 25,
//         //             sex: "Male"
//         //         }],
//         //         timestamp: new Date()
//         //     })

//         // console.log(data)

//         // const resultBack = await collection.findOne({data: {$elemMatch: {age:25}}})    // This
//         // const resultBack = await collection.findOne({"data.age":25})                   // and This , both gives the same result

//         const resultBack = await collection.find().toArray();
//         // await resultBack.forEach(result => console.log(result));
//         // const data = await resultBack.toArray();
//         // console.log(data);
//         console.log(resultBack)

//         // const result = await collection.updateOne(
//         //     {name: "Muzammil"},
//         //     {$pull: {"data.$": 7}}
//         //     )

//         // console.log(result)

//     } catch (error) {
//         console.log(error);
//     } finally {
//         await client.close();
//     }

// }

// connectMongo();