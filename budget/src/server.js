import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import sqlite3 from "sqlite3";
import path from "path";

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connect to SQLite3 Database
const db = new sqlite3.Database("./restaurant_management.db", (err) => {
  if (err) console.error("Error opening database:", err);
  else console.log("Connected to SQLite3 database.");
});

// Create Users Table
db.run(
  `CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    company TEXT NOT NULL,
    phone TEXT NOT NULL UNIQUE,
    email TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL
  )`,
  (err) => {
    if (err) console.error("Error creating users table:", err);
  }
);

// Create Incomes Table
db.run(
  `CREATE TABLE IF NOT EXISTS incomes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    date TEXT NOT NULL,
    source TEXT NOT NULL,
    description TEXT,
    amount REAL NOT NULL,
    category TEXT NOT NULL
  )`,
  (err) => {
    if (err) console.error("Error creating incomes table:", err);
    else console.log("Incomes table created successfully.");
  }
);

// Create Expenses Table
db.run(
  `CREATE TABLE IF NOT EXISTS expenses (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    date TEXT NOT NULL,
    name TEXT NOT NULL,
    description TEXT,
    amount REAL NOT NULL,
    category TEXT NOT NULL
  )`,
  (err) => {
    if (err) console.error("Error creating expenses table:", err);
    else console.log("Expenses table created successfully.");
  }
);

// Serve React Frontend

// SignUp Route
app.post("/signup", (req, res) => {
  const { name, company, phone, email, password } = req.body;

  if (!name || !company || !phone || !email || !password) {
    return res.status(400).json({ error: "All fields are required!" });
  }

  const sql = `INSERT INTO users (name, company, phone, email, password) VALUES (?, ?, ?, ?, ?)`;

  db.run(sql, [name, company, phone, email, password], function (err) {
    if (err) {
      if (err.message.includes("UNIQUE constraint failed")) {
        return res
          .status(400)
          .json({ error: "Email or phone already exists!" });
      }
      return res.status(500).json({ error: "Database error: " + err.message });
    }
    res.status(201).json({ message: "User registered successfully!" });
  });
});

// SignIn Route
app.post("/signin", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required!" });
  }

  const sql = "SELECT * FROM users WHERE email = ?";
  db.get(sql, [email], (err, user) => {
    if (err)
      return res.status(500).json({ error: "Database error: " + err.message });
    if (!user) return res.status(400).json({ error: "User not found!" });

    if (password !== user.password) {
      return res.status(400).json({ error: "Invalid credentials!" });
    }

    res.status(200).json({ message: "Sign in successful!", user });
  });
});

// Add Income Route
app.post("/incomes", (req, res) => {
  const { date, source, description, amount, category } = req.body;

  if (!date || !source || !amount || !category) {
    return res.status(400).json({ error: "Required fields are missing!" });
  }

  const sql = `INSERT INTO incomes (date, source, description, amount, category) VALUES (?, ?, ?, ?, ?)`;
  db.run(sql, [date, source, description, amount, category], function (err) {
    if (err) {
      return res.status(500).json({ error: "Database error: " + err.message });
    }
    res
      .status(201)
      .json({ message: "Income added successfully!", id: this.lastID });
  });
});

// Update Income Route
app.put("/incomes/:id", (req, res) => {
  const { id } = req.params;
  const { date, source, description, amount, category } = req.body;

  if (!date || !source || !amount || !category) {
    return res.status(400).json({ error: "Required fields are missing!" });
  }

  const sql = `UPDATE incomes SET date = ?, source = ?, description = ?, amount = ?, category = ? WHERE id = ?`;
  db.run(
    sql,
    [date, source, description, amount, category, id],
    function (err) {
      if (err) {
        return res
          .status(500)
          .json({ error: "Database error: " + err.message });
      }
      res.status(200).json({ message: "Income updated successfully!" });
    }
  );
});

// Delete Income Route
app.delete("/incomes/:id", (req, res) => {
  const { id } = req.params;

  const sql = `DELETE FROM incomes WHERE id = ?`;
  db.run(sql, [id], function (err) {
    if (err) {
      return res.status(500).json({ error: "Database error: " + err.message });
    }
    res.status(200).json({ message: "Income deleted successfully!" });
  });
});

// Fetch Latest 10 Incomes Route
app.get("/incomes/latest", (req, res) => {
  const sql = `SELECT * FROM incomes ORDER BY date DESC LIMIT 10`;
  db.all(sql, [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: "Database error: " + err.message });
    }
    res.status(200).json(rows);
  });
});

// Add Expense Route
app.post("/expenses", (req, res) => {
  const { date, name, description, amount, category } = req.body;

  if (!date || !name || !amount || !category) {
    return res.status(400).json({ error: "Required fields are missing!" });
  }

  const sql = `INSERT INTO expenses (date, name, description, amount, category) VALUES (?, ?, ?, ?, ?)`;
  db.run(sql, [date, name, description, amount, category], function (err) {
    if (err) {
      return res.status(500).json({ error: "Database error: " + err.message });
    }
    res
      .status(201)
      .json({ message: "Expense added successfully!", id: this.lastID });
  });
});

// Update Expense Route
app.put("/expenses/:id", (req, res) => {
  const { id } = req.params;
  const { date, name, description, amount, category } = req.body;

  if (!date || !name || !amount || !category) {
    return res.status(400).json({ error: "Required fields are missing!" });
  }

  const sql = `UPDATE expenses SET date = ?, name = ?, description = ?, amount = ?, category = ? WHERE id = ?`;
  db.run(sql, [date, name, description, amount, category, id], function (err) {
    if (err) {
      return res.status(500).json({ error: "Database error: " + err.message });
    }
    res.status(200).json({ message: "Expense updated successfully!" });
  });
});

// Delete Expense Route
app.delete("/expenses/:id", (req, res) => {
  const { id } = req.params;

  const sql = `DELETE FROM expenses WHERE id = ?`;
  db.run(sql, [id], function (err) {
    if (err) {
      return res.status(500).json({ error: "Database error: " + err.message });
    }
    res.status(200).json({ message: "Expense deleted successfully!" });
  });
});

// Fetch Latest 10 Expenses Route
app.get("/expenses/latest", (req, res) => {
  const sql = `SELECT * FROM expenses ORDER BY date DESC LIMIT 10`;
  db.all(sql, [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: "Database error: " + err.message });
    }
    res.status(200).json(rows);
  });
});

app.get("/user", (req, res) => {
  const sql = `SELECT name FROM users WHERE email = ?`;
  db.get(sql, [req.query.email], (err, user) => {
    if (err) {
      return res.status(500).json({ error: "Database error: " + err.message });
    }
    res.status(200).json(user);
  });
});

app.post("/planner", (req, res) => {
  const { date } = req.body;

  if (!date) {
    return res.status(400).json({ error: "Date is required!" });
  }

  const incomeSql = `SELECT SUM(amount) as total_income FROM incomes WHERE date = ?`;
  const expenseSql = `SELECT SUM(amount) as total_expense FROM expenses WHERE date = ?`;

  db.get(incomeSql, [date], (err, incomeRow) => {
    if (err) {
      return res.status(500).json({ error: "Database error: " + err.message });
    }

    db.get(expenseSql, [date], (err, expenseRow) => {
      if (err) {
        return res
          .status(500)
          .json({ error: "Database error: " + err.message });
      }

      const totalIncome = incomeRow.total_income || 0;
      const totalExpense = expenseRow.total_expense || 0;

      res.status(200).json({
        total_income: totalIncome,
        total_expense: totalExpense,
      });
    });
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
