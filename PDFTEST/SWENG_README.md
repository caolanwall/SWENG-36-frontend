This is the project to test uploading and downloading of pdfs.

npm install
npm start

cd client2
npm install
npm start

app.js is the server
-has get and post requests to upload and download files from gridfs
-these all work in postman
//app.get("/files/:filename", (req, res) => {
  -on postman you can download the file requested using following(got filename with http://localhost:5001/files on postman)
    http://localhost:5001/files/51579f1c26ee9b424fd0fd857d7dcd19.pdf

-Front-end under client2 folder
-Upload.js
  -works fine
  -test at http://localhost:3000/upload on React App
  -uses app.post("/uploadPDF", upload.single("file"), (req, res) => { from app.js
  -this is the same as the file in the front-end app but it now sends the file to the backend and stores it in gridfs successfully.

-PeerSubmission
  -view at http://localhost:3000/peer on React App
  -trying to download a pdf file from backend
  -having trouble with this and can't get it integrated with front-end properly
  -there's a couple of attempts commented out in fileDownloadHandler
  -does work on postman
  -logs to console that server side function run
