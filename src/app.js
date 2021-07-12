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

export default app;
