const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const userRoutes = require("./routes/UserRoutes.Js");
const app = express();

//middlewares
app.use(express.json());
app.use(userRoutes);
app.set("views", "./views");
// connect To DataBase
mongoose
  .connect("mongodb://localhost:27017/ManagementDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
     useFindAndModify: false 
  })
  .then(() => {
    console.log("Db Connected");
  })
  .catch((err) => {
    console.error("Db Not Connected:", err);
  });

const port = 3000;
app.get("/", (req, res) => res.send("Hello World!"));
app.listen(port, () => console.log(`app listening on port port!`));
