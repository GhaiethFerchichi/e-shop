// import dependencies
const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
// import the routes
const productRoute = require("./server/routes/productRoute");

// set up dependencies
const app = express();
app.use(morgan("dev"));

// MiddleWare
app.use(express.json());
// set up envirement Variables
require("dotenv/config");
const api = process.env.API_URL;

//set up mongoDB with mongoose connection
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((res) => console.log("Connection Established with MONGODB"))
  .catch((err) => console.log(err));

// Summary
app.get("/", (req, res) => res.send("Hello Api Summary on " + api));

// routes
app.use(`/${api}/products`, productRoute);

// app.get(`/${api}/products`, (req, res) => {
//   const product = {
//     id: 1,
//     name: "Adidas SuperStar",
//     color: "White",
//   };
//   res.json(product);
// });

// app.post(`/${api}/products`, (req, res) => {
//   console.log(req.body);
//   res.json(req.body);
// });

const PORT = process.env.PORT || 9001;
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT} !`);
});
