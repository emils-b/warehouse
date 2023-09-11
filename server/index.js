const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

//Middleware
app.use(bodyParser.json());
app.use(cors());

const warehouse = require('./routes/api/warehouse');
app.use('/api/warehouse', warehouse);

const port = process.env.PORT || 6000;

app.listen(port, () => console.log(`Server started on port ${port}`));
