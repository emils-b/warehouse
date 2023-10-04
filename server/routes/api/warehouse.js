const express = require("express");
const mysql = require("mysql");
const dotenv = require("dotenv");
dotenv.config();

var connection = mysql.createConnection({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});

const router = express.Router();

//get all products from warehouse DB. Contains: id, description, name, price, amount, sku
router.get("/products", async (req, res) => {
  try {
    const sql = "SELECT * from products";
    connection.query(sql, function (error, results) {
      if (error) {
        res.send({ success: false });

        return;
      }

      res.send({ success: true, results });
    });
  } catch (error) {
    res.send({ success: false });
  }
});

//add new product
router.post("/product", async (req, res) => {
  try {
    const sql =
      "INSERT INTO products (description, name, price, amount, sku) VALUES (?, ?, ?, ?, ?)";
    const sqlParams = [
      req.query.description,
      req.query.name,
      req.query.price,
      req.query.amount,
      req.query.sku,
    ];

    connection.query(sql, sqlParams, function (error, results) {
      if (error) {
        res.send({ success: false });

        return;
      }
    });

    res.send({ success: true });
  } catch (error) {
    res.send({ success: false });
  }
});

//update existing product
router.post("/updateProduct", async (req, res) => {
  try {
    const sql =
      "UPDATE products SET description = ?, name = ?, price = ?, amount = ? WHERE sku = ?";
    const sqlParams = [
      req.query.description,
      req.query.name,
      req.query.price,
      req.query.amount,
      req.query.sku,
    ];

    connection.query(sql, sqlParams, function (error, results) {
      if (error) {
        res.send({ success: false });

        return;
      }

      res.send({ success: true });
    });
  } catch (error) {
    res.send({ success: false });
  }
});

//delete specific product
router.delete("/product", async (req, res) => {
  try {
    const sku = req.query.sku;
    const sql = "DELETE FROM Products WHERE sku = ?;";
    connection.query(sql, [sku], function (error, results) {
      if (error) {
        res.send({ success: false });

        return;
      }

      res.send({ success: true });
    });
  } catch (error) {
    res.send({ success: false });
  }
});

//Return one specific product by sku
router.get("/product", async (req, res) => {
  try {
    const sql = "SELECT * from products where sku = ?";
    const sku = req.query.sku;

    connection.query(sql, [sku], function (error, results) {
      if (error) {
        res.send({ success: false });

        return;
      }

      res.send({ success: true, results });
    });
  } catch (error) {
    res.send({ success: false });
  }
});

module.exports = router;

//Update remaining amount when product is bought
router.post("/updateAmount", async (req, res) => {
  try {
    const sku = req.query.sku;
    const amount = req.query.amount;

    const sql = "UPDATE products SET amount = (amount - ?) WHERE sku = ?";
    connection.query(sql, [amount, sku], function (error, results) {
      if (error) {
        res.send({ success: false });

        return;
      }

      res.send({ success: true, results });
    });
  } catch (error) {
    res.send({ success: false });
  }
});
