const express = require("express");
const path = require("path");
const app = express();
const port = 80;
const bodyParser = require("body-parser");
var mongoose = require("mongoose");
app.use(bodyParser.json())
app.use(bodyParser.urlencoded())
mongoose.connect("mongodb://localhost/contactDance", { useNewUrlParser: true });

// Defining Mongoose Schema
var contactSchema = new mongoose.Schema({
  name: String,
  age: String,
  gender: String,
  email: String,
  desc: String,
});

var Contact = mongoose.model("Contact", contactSchema);

app.use("/static", express.static("static"));

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

app.get("/", (req, res) => {
  res.status(200).render("home.pug");
});
app.get("/contact", (req, res) => {
  res.status(200).render("contacts.pug");
});
app.post("/contact", (req, res) => {
  var myData = new Contact(req.body);
  myData
    .save()
    .then(() => {
      res.send("This item has been saved to the database.");
    })
    .catch(() => {
      res
        .status(400)
        .send("Item was not saved in the database due to some error.");
    });
});

app.listen(port, () => {
  console.log(`App successfully started on port ${port}`);
});
