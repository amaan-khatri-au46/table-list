const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const mongoose = require("mongoose");
const TableItem = require("./routes/tableItem.js");
const User = require("./routes/userRoutes.js");

const app = express();

dotenv.config();

const PORT = 8000;

app.use(express.json());
app.use(cors());

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO);
    console.log("connected To db");
  } catch (error) {
    throw error;
  }
};

app.use("/api", TableItem);
app.use("/api", User);

app.listen(PORT, () => {
  console.log(`app started at ${PORT}`);
  connect();
});

// PORT = 5000
// MONGO = mongodb+srv://AMAANKHATRI:amaankhatriqureshishaikh@amaankhatri.bfvdktd.mongodb.net/
// JWT_SECRET = 80205e15f8c2854cb07a496889ac7cb3e8b39a745ec24bc4776cab4a902610a4
