require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

mongoose.connect(
  "mongodb+srv://admin-ehis:" +
    process.env.PASSWORD +
    "@cluster0.5p0bt.mongodb.net/payqartdb",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

mongoose.set("useFindAndModify", false);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log("We are connected to DB!");
});

const userSchema = new mongoose.Schema({
  fullName: "String",
  totalCartValue: "Number",
  downPayment: "Number",
  shoppingCredit: "Number",
  payDuration: "Number",
  interestRate: "Number",
  totalInterestPayable: "Number",
  monthlyRepayment: "Number",
});

const User = mongoose.model("User", userSchema);

app.post("/", (req, res) => {
  const body = req.body;
  const newBorrower = new User({
    ...body,
  });
  newBorrower.save((err) => {
    if (err) {
      console.log(
        "Error while saving borrower's information to database" + err
      );
      return res.status(404).json();
    }
    res.json(newBorrower);
  });
});

const port = process.env.port || 9000;
app.listen(port, function (req, res) {
  console.log("Server started at port " + port);
});
