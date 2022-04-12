const express = require("express");
const hbs = require("hbs");
const path = require("path");
const userRoutes = require("./routes/task.routes");

const app = express();

app.use(express.urlencoded({ extended: true }));

app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "resources/views"));

hbs.registerPartials(path.join(__dirname, "resources/layouts"));

app.use(express.static(path.join(__dirname, "public")));

// routes
app.use(userRoutes);

// not found
app.get("*", (req, res) => {
    res.render("notFound", {
        title: "page not found",
    });
});

module.exports = app;