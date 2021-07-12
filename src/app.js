import express from "express";
import cors from "cors";

import connection from "./database.js";

const app = express();
app.use(express.json());
app.use(cors());

app.get("/shopping", async (req, res) => {
    try {
        const list = await connection.query(`SELECT * FROM compras`);
        res.send(list.rows);
    } catch {
        res.sendStatus(500);
    }
});

app.post("/shopping", async (req, res) => {
    try {
        const newItem = req.body;
        if (!newItem.text) return res.sendStatus(400)
        await connection.query(`INSERT INTO compras (text) VALUES ($1)`, [newItem.text]);
        res.sendStatus(201);
    } catch {
        res.sendStatus(500);
    }
});

export default app;
