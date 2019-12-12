// Dependencies
// =============================================================
const express = require("express");
const path = require("path");
const fs = require("fs");

// Sets up the Express App
// =============================================================
const app = express();
const PORT = process.env.PORT || 1000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// Routes
// =============================================================

// * GET `/notes` - Should return the `notes.html` file.
app.get("/notes", function(req, res) {
  res.sendFile(path.join(__dirname, 'public',"notes.html"));
});

// * GET `*` - Should return the `index.html` file
app.get("*", function(req, res) {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

/*---------------------------------------------------------------------------------------*/
// * GET `/api/notes` - Should read the `db.json` file and return all saved notes as JSON.
app.get("/api/notes", function(req, res) {
  fs.readFile("./db/db.json", function(err, data) {
    if (err) throw err;         
    res.send(JSON.parse(data));
  });
}); 

// * POST `/api/notes`  
app.post("/api/notes", function (req, res) {
// - Should recieve a new note to save on the request body, add it to the `db.json` file, 
const rawdata = fs.readFileSync("db/db.json");
const parsedata = JSON.parse(rawdata);
const newObj = parsedata.concat(req.body);
const string = JSON.stringify(newObj);
fs.writeFile("db/db.json", string, function(err) {
  if(err) console.log("this is Error" + err);
// and then return the new note to the client.
  res.json(string)
  });
});

// * DELETE `/api/notes/:id`
app.delete('/api/notes/:title', function (req, res) {
  // In order to delete a note, you'll need to read all notes from the `db.json` file,
  const rawdata = fs.readFileSync("db/db.json");
  const parsedata = JSON.parse(rawdata);
  const title = req.params.test
  //  remove the note with the given `id` property, 
  const remain = parsedata.filter(o => o.title !== title);
  // and then rewrite the notes to the `db.json` file.
  fs.writeFile("db/db.json", JSON.stringify(remain), function (err) {
    if(err) throw err;
    res.json(remain);
  });
});

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});
