const express = require("express");
const app = express();

const crypto = require("crypto");
const path = require("path");
const mongoose = require("mongoose");
const multer = require("multer");
const GridFsStorage = require("multer-gridfs-storage");

// Middlewares
app.use(express.json());

//// TODO: NO NEED, add body parser
app.set("view engine", "ejs");

// DB
//// TODO: change this URI
const mongoURI = "mongodb://localhost:27017/node-file-upl";

// connection
const conn = mongoose.createConnection(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// init gfs
let gfs;
conn.once("open", () => {
  // init stream
  gfs = new mongoose.mongo.GridFSBucket(conn.db, {
    bucketName: "uploads"
  });
});

// Storage
//Hexs filename before uploading
const storage = new GridFsStorage({
  url: mongoURI,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err) {
          return reject(err);
        }
        const filename = buf.toString("hex") + path.extname(file.originalname);
        const fileInfo = {
          filename: filename,
          bucketName: "uploads"
        };
        resolve(fileInfo);
      });
    });
  }
});

const upload = multer({
  storage
});

// get / page
//Uploads file to GridFsStorage
//Records contentType as application/pdf
app.get("/upload", (req, res) => {
  if(!gfs) {
    console.log("some error occured, check connection to db");
    res.send("some error occured, check connection to db");
    process.exit(0);
  }
  gfs.find().toArray((err, files) => {
    // check if files
    if (!files || files.length === 0) {
      return res.render("index", {
        files: false
      });
    } else {
      const f = files
        .map(file => {
          if (
            file.contentType === "application/pdf"
          ) {
            file.isPDF = true;
          } else {
            file.isPDF = false;
          }
          return file;
        })
        .sort((a, b) => {
          return (
            new Date(b["uploadDate"]).getTime() -
            new Date(a["uploadDate"]).getTime()
          );
        });
        console.log("Uploaded Successfully");
      return res.render("index", {
        files: f
      });
    }

    // return res.json(files);
  });
});

//Called in Upload.js to upload file from your computer
app.post("/uploadPDF", upload.single("file"), (req, res) => {
  // res.json({file : req.file})
  res.redirect("/upload");
});

//Returns id and filenames of all files on server
app.get("/files", (req, res) => {
  console.log("get files should be running")
  gfs.find().toArray((err, files) => {
    // check if files
    if (!files || files.length === 0) {
      return res.status(404).json({
        err: "no files exist"
      });
    }

    return res.json(files);
  });
});


//This works with postman but can't integrate
//Can download a file put on the server from postman
//might need to change this to get ids
app.get("/files/:filename", (req, res) => {
   console.log('running get file');
  const file = gfs
    .find({
      filename: req.params.filename
    })
    .toArray((err, files) => {
      if (!files || files.length === 0) {
        console.log('fail');
        return res.status(404).json({
          err: "no files exist"
        });
      }
      console.log('Returning file');
      return gfs.openDownloadStreamByName(req.params.filename).pipe(res);
    });
});


// files/del/:id
// Delete chunks from the db
app.post("/files/del/:id", (req, res) => {
  gfs.delete(new mongoose.Types.ObjectId(req.params.id), (err, data) => {
    if (err) return res.status(404).json({ err: err.message });
    res.redirect("/");
  });
});

const port = 5001;

app.listen(port, () => {
  console.log("server started on " + port);
});
