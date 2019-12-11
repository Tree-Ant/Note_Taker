// Dependencies
// =============================================================
var express = require("express");
var path = require("path");
var fs = require("fs");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


// Routes
// =============================================================

// * GET `/notes` - Should return the `notes.html` file.
app.get("/notes", function(req, res) {
  res.sendFile(path.join(__dirname, "./public/notes.html"));
  console.log("hello");
});

// * GET `*` - Should return the `index.html` file
app.get("*", function(req, res) {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});

/*---------------------------------------------------------------------------------------*/
// * GET `/api/notes` - Should read the `db.json` file and return all saved notes as JSON.
app.get("/api/notes", function(req, res) {
  fs.readFile(__dirname + "./db/db.json", function(err, jsonString) {
    if (err){
      console.log(err);
      return;
    }     
    res.json(JSON.parse(jsonString));
  });
}); 

// * POST `/api/notes`  
app.post("/api/notes", function (req, res) {
// - Should recieve a new note to save on the request body, add it to the `db.json` file, 
const rawdata = fs.readFileSync("db/db.json");
const parsedata = JSON.parse(rawdata);
const newObj = parse.data.concat(body);
const string = JSON.stringify(newObj);
fs.writeFile("db/db.json", string, function(err) {
  if(err) console.log(err);
// and then return the new note to the client.
  res.json(string)
  });
});

// * DELETE `/api/notes/:id`
app.delete('/api/notes/:id', function (req, res) {


// - Should recieve a query paramter containing the id of a note to delete. This means you'll need to find a way to give each note a unique `id` when it's saved. 

// In order to delete a note, you'll need to read all notes from the `db.json` file,

//  remove the note with the given `id` property, 
 
//  and then rewrite the notes to the `db.json` file.

});
// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});
