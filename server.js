const express = require("express");
const fs = require("fs");
const { exec } = require("child_process");

const app = express();

// ✅ MANUAL CORS FIX (stronger than cors())
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Content-Type");

    if (req.method === "OPTIONS") {
        return res.sendStatus(200);
    }

    next();
});

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

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log("🔥 Server running on port " + PORT);
});
    console.log("🔥 Server running on port 5000");
});