const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
const jwt = require("jsonwebtoken");
//const bcrypt = require("bcrypt");

const applications = require("./applications");
const { secretKey } = require("./config");
const LoginModel = require("./model/login");
const DonorModel = require("./model/donor");
const CauseAmountModel = require("./model/amount");
const AdminModel=require("./model/admin");
app.use(express.json());
app.use(cors());
mongoose.connect(
  "mongodb+srv://philafund:philafundsem62024@project-mernstack.xv0zhc5.mongodb.net/philanthropy"
);
app.use("/", applications);
/*app.post("/register", (req, res) => {
  LoginModel.create(req.body)
    .then((LoginUsers) => res.json(LoginUsers))
    .catch((err) => res.json(err));
});*/

app.post("/register", (req, res) => {
  const { name, email, password } = req.body;

  LoginModel.findOne({ email: email })
    .then((user) => {
      if (user) {
        return res.status(409).json({
          status: "Error",
          error: "User already exists!",
        });
      } else {
        const newUser = new LoginModel({
          name: name,
          email: email,
          password: password,
        });

        newUser
          .save()
          .then(() => {
            console.log("Successfully inserted user details");
            return res.status(200).json({
              status: "Success",
              message: "User registered successfully",
            });
          })
          .catch((err) => {
            console.error("Error inserting user details:", err);
            return res.status(500).json({
              status: "Error",
              error: "Database Error, could not insert the given data",
            });
          });
      }
    })
    .catch((err) => {
      console.error("Database Error:", err);
      return res.status(500).json({
        status: "Error",
        error: "Database Error",
      });
    });
});

/*app.post("/login", (req, res) => {
  const { email, password } = req.body;
  LoginModel.findOne({ email: email }).then((user) => {
    if (user) {
      if (user.password === password) {
        res.json("Success");
      } else {
        res.json("The password is incorrect");
      }
    } else {
      res.json("This account does not exist");
    }
  });
});*/


app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    // Find user by email
    const user = await LoginModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    // Compare passwords
    if (password !== user.password) {
      return res.status(401).json({ error: "Invalid password" });
    }
    // If login is successful, generate JWT token
    const token = jwt.sign({ userId: user._id }, secretKey, {
      expiresIn: "1h",
    });
    // Return token and user name
    res.json({ token, name: user.name });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/loginadmin", async (req, res) => {
  const { username, password } = req.body;
  try {
    // Find user by email
    const user = await AdminModel.findOne({ username });
    if (!user) {
      return res.status(404).json({ error: "Admin not found" });
    }
    // Compare passwords
    if (password !== user.password) {
      return res.status(401).json({ error: "Invalid password" });
    }
    // If login is successful, generate JWT token
    const token = jwt.sign({ userId: user._id }, secretKey, {
      expiresIn: "1h",
    });
    // Return token and user name
    res.json({ token, name: user.username });
    console.log(user.username)
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});


app.post("/donate/:causeId", async (req, res) => {
  try {
    const { name, email, contactNo, address, amount } = req.body;
    const causeId = req.params.causeId;

    // Create a new donor document
    const newDonor = new DonorModel({
      name,
      email,
      contactNo,
      address,
      amount,
      causeId,
    });

    // Save the donor to the database
    await newDonor.save();

    // Update the cause_amount collection if causeId is valid (1 or 2)
    /*if (causeId === "1" || causeId === "2") {
      await CauseAmountModel.updateOne({ causeId }, { $inc: { sum: amount } });
    } else {
      throw new Error("Invalid causeId");
    }
*/
    // Update the cause_amount collection if causeId is valid (1 or 2)
    if (causeId === "1" || causeId === "2" || causeId==="3") {
      await CauseAmountModel.findOneAndUpdate(
        { causeId },
        { $inc: { sum: amount } },
        { new: true, upsert: false } // Set upsert option to false to prevent creating new documents
      );
    } else {
      throw new Error("Invalid causeId");
    }

    res
      .status(201)
      .json({ message: "Donor details saved successfully", donor: newDonor });
  } catch (error) {
    console.error("Error saving donor details:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.get("/display/:causeId", async (req, res) => {
  const causeId = req.params.causeId;
  try {
    const donors = await DonorModel.find({ causeId: causeId }).select(
      "-causeId"
    );
    if (donors.length === 0) {
      return res
        .status(404)
        .json({ error: "Donors not found for this cause ID" });
    }
    res.json(donors);
  } catch (err) {
    console.error("Error fetching donors", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});



app.listen(3001, () => {
  console.log("Server is running in 3001");
});
