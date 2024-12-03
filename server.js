const express = require("express");
const cors = require('cors') 
const server = express()
const bodyParser = require("body-parser");
const mongoose = require('mongoose');


main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/test');
  console.log("db connect")
}
const userSchema = new mongoose.Schema({
  sitename : 'string',
  heroSection:'string',
  aboutSection:'string'
})

const User = mongoose.model('User', userSchema)
server.use(cors());
server.use(bodyParser.json())


server.post('/',async(req,res)=>{
  let user = new User();
  user.sitename = req.body.sitename;
  user.heroSection = req.body.heroSection;
  user.aboutSection = req.body.aboutSection;
  const doc = await user.save();


  console.log(doc)
  res.json(doc)
} )
server.get('/',async(req,res)=>{
  const docs = await User.find({})
  res.json(docs)
} )

server.listen(5001,()=>{
  console.log("chalu h")
})

// const mongoose = require("mongoose");
// const cors = require("cors");

// const app = express();

// // Middleware
// app.use(cors());
// app.use(express.json());

// // MongoDB Connection
// mongoose.connect("your_mongo_connection_string", {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

// mongoose.connection.once("open", () =>
//   console.log("Connected to MongoDB successfully")
// );

// // Define a schema and model
// const DataSchema = new mongoose.Schema({
//   sitename: String,
//   heroSection: String,
//   aboutSection: String,
// });

// const Data = mongoose.model("Data", DataSchema);

// // API routes
// app.get("/api/data", async (req, res) => {
//   const data = await Data.find();
//   res.json(data);
// });

// app.post("/api/data", async (req, res) => {
//   const newData = new Data(req.body);
//   await newData.save();
//   res.json({ message: "Data saved successfully" });
// });

// // Start server
// const PORT = 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
// node server.js
