const express = require("express");
const path = require("path");
const fs = require('fs');

const app = express();

// Setters
app.use(express.json());
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.set("PORT", process.env.PORT || 3000);

// Middleware
app.use("/", require("./routes/index"));

app.listen(app.get("PORT"), () =>
    console.log(`Server listen at Port ${app.get("PORT")}`)
);
