import mongoose from "mongoose";

const connectToMongoDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://chatbot:AI@cluster0.9crdm.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
    );
    console.log("mongodb connected successfuly");
  } catch (error) {
    console.log("error to connecting db", error.message);
  }
};
export default connectToMongoDB;

// const mongoose = require("mongoose");
// var mongoURL =
//   "mongodb+srv://chatbot:AI@cluster0.9crdm.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
// mongoose
//   .connect(mongoURL)

//   .then(() => {
//     console.log("Database connected");
//   })
//   .catch((err) => {
//     console.log(err);
//   });
// module.exports = mongoose;
