//requiring  modules
const express = require("express");
const path = require("path");
const fs = require("fs");
const uniqid = require("uniqid");

const dbJ = require("./db/db.json");

//Local host PORT
const PORT = process.env.PORT || 3001;

const app = express();

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Allows us to go through public folder
app.use(express.static("public"));

//GET Modular Routing here <---->
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});

app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/notes.html"));
});

app.get("/api/notes", (req, res) => {
  res.json(dbJ);
});

//POST Routing here <-------->
app.post("/api/notes", (req, res) => {
  //Log our request to terminal
  console.info(`${req.method} request has been received`);

  //destructuring
  const { title, text } = req.body;

  if (title && text) {
    const newNote = {
      title,
      text,
      id: uniqid(),
    };

    //loads the existing notes
    fs.readFile("./db/db.json", "utf8", (err, data) => {
      if (err) {
        console.log(err);
      } else {
        const parsedNote = JSON.parse(data); //jsonifying obj data

        //to input new notes
        parsedNote.push(newNote);

        //add new notes to db folder
        fs.writeFile(
          "./db/db.json",
          JSON.stringify(parsedNote),
          null,
          (err) => {
            err
              ? console.error(err)
              : console.info("New Note Added Successfully!");
          }
        );
      }
    });
    const response = {
      status: "Success",
      body: newNote,
    };

    console.log(response);
    res.status(201).json(response);
  } else {
    res.status(500).json("Error in posting New Notes");
  }
});
// TODO : Bonus: DELETE METHOD

// app.delete('/api/notes/:id', (req, res) => {
//     const id = req.params.id
//     const newNotes = db.filter(el => el.id != id)
//     notes = newNotes

//     res.send({
//         success: true,
//         message: "Note Deleted Successfully!"
//     })
// })

app.listen(PORT, () =>
  console.log(`App Serving at http://localhost:${PORT} 🚀`)
);
