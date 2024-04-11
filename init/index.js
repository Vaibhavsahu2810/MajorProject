const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");


main().then(() => {console.log("Connected to MongoDB")})
.catch((err) => {console.log(err)});
async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/Tripz");
}

const initDB = async () =>{
    await Listing.deleteMany({});
    initData.data = initData.data.map((obj) =>({...obj,owner : '65feda15ffc885259b1dfcb3'}));
   await Listing.insertMany(initData.data);
    console.log("data was initialized");
};

initDB();