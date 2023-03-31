import express from "express";
import { Reminder, sequelize } from "./models/reminder.js";
import { Op } from "sequelize";

const app = express();

app.use(express.json());

// Create a new reminder
app.post("/reminders", async (req, res) => {
  const { text, user, date } = req.body;

  const reminder = await Reminder.create({ text, user, date });

  res.status(201).json(reminder);
});

// Get all reminders
app.get("/reminders", async (req, res) => {
  res.set("Access-Control-Allow-Origin", `${process.env.CLIENT_URL}`);
  const { user, after } = req.query;
  const where = {};

  if (user) {
    where.user = user;
  }

  if (after) {
    where.date = {
      [Op.gte]: new Date(Number(after)),
    };
  }

  const reminders = await Reminder.findAll({ where, order: [["id", "ASC"]] });
  res.status(200).json(reminders);
});

// Get a single reminder
app.get("/reminders/:id", async (req, res) => {
  const { id } = req.params;

  const reminder = await Reminder.findByPk(id);
  if (!reminder) {
    return res.status(404).send("ID not found");
  }

  res.status(200).json(reminder);
});

// Delete a reminder (not allowed)
app.delete("/reminders/:id", (_req, res) => {
  res.status(405).send("Method not allowed.");
});

// Update a reminder (not allowed)
app.put("/reminders/:id", (_req, res) => {
  res.status(405).send("Method not allowed.");
});

// Update a reminder (not allowed)
app.patch("/reminders/:id", (_req, res) => {
  res.status(405).send("Method not allowed.");
});

// Sync the model with the database
async function main() {
  try {
    await sequelize.authenticate();
    console.log(
      "Connection to the database has been established successfully."
    );
    await sequelize.sync({ force: true });
    console.log("All models were synchronized successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}

await main();

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
