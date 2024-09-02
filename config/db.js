const mongoose = require("mongoose");

const uri = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PWD}@cluster0.oemxc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`

const dbConnect = async () => {
  try {
    mongoose.connect(uri);
    console.log("Connected to MongoDB successfully!");
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = dbConnect;