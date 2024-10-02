const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));

// Home route
app.get("/", function (req, res) {
  fs.readdir("./files", function (err, files) {
    if (err) {
      console.error(err);
      return res.status(500).send("Error reading directory");
    }
    res.render("index", { files: files });
  });
});

// Create file route
app.post("/create", function (req, res) {
  fs.writeFile(
    `./files/${req.body.title}.txt`,
    req.body.details,
    function (err) {
      if (err) {
        console.error(err);
        return res.status(500).send("Error creating file");
      }
      res.redirect("/");
    }
  );
});

// Read file route
app.get("/data/:dat", function (req, res) {
  fs.readFile(
    `./files/${req.params.dat}`,
    "utf-8",
    function (err, filedata) {
      res.render("data", { filename: req.params.dat, filedata: filedata });
    }
  );
});

// Start server
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
