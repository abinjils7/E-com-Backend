const mongoose = require("mongoose");

const connectDb = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://abinjils96:965623@grid.chc5mqu.mongodb.net/Ecommerce?retryWrites=true&w=majority"
    );
    console.log("MongoDB is connected");
  } catch (error) {
    console.error(" MongoDB connection failed:", error.message);
    process.exit(1);
  }
};

module.exports = connectDb;
