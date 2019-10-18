const fs = require("file-system");
const path = require("path");
const readline = require("readline");

var pathToEdit = path.join(__dirname + "/../");

fs.readdir(pathToEdit, (err, files) => {
    files.forEach(file => {
        //Go through each and every html file:
        //Check if the file is an html file
        if(file.split(".")[1] == "html") {
          console.log(file)
          var readInterface = readline.createInterface({
            input: fs.createReadStream(pathToEdit + "/" + file),
            output: process.stdout,
            console: false
          });

          readInterface.on('line', function(line) {
            console.log(line);
        });
        }
    });
  });