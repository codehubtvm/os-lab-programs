const express = require("express");
const fs = require("fs");
const { exec } = require("child_process");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.post("/run", (req, res) => {
    const code = req.body.code;

    fs.writeFileSync("program.c", code);

    exec("gcc program.c -o program && ./program", (error, stdout, stderr) => {
        if (error) {
            return res.json({ output: stderr });
        }
        res.json({ output: stdout });
    });
});

app.get("/", (req, res) => {
    res.send("Server is working ✅");
});

app.listen(5000, () => {
    console.log("🔥 Server running on port 5000");
});