const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const dotenv = require("dotenv");
dotenv.config({ path: path.resolve(__dirname, "../.env") });
const app = express();

//Middleware
app.use(bodyParser.json());
app.use(cors());

const warehouse = require("./routes/api/warehouse");
app.use("/api/warehouse", warehouse);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(__dirname + "/public/"));
  app.get(/.*/, (req, res) => res.sendFile(__dirname + "/public/index.html"));
}

const port = process.env.PORT || 5001;

app.listen(port, () => console.log(`Server started on port ${port}`));
