const fs = require("file-system");
const path = require("path");
const readline = require("readline");

var pathToEdit = path.join(__dirname + "/../");
var dateLength = 25;

fs.readdir(pathToEdit, (err, files) => {
    files.forEach(file => {
        //Go through each and every html file:
        //Check if the file is an html file
        if(file.split(".")[1] == "html") {
          var readInterface = readline.createInterface({
            input: fs.createReadStream(pathToEdit + "/" + file),
            console: false
          });
          readInterface.on('line', function(line) {
            if(line.split("property=").length > 1) {
            if(line.split("property=")[1].substring(1,26) == "og:article:published_time") {
              //Get the modified date
              var date = line.split("content=")[1].substring(1,11)
              console.log(date);
              fs.rename(pathToEdit + "/" + file, pathToEdit + "/" + date + ".html", (err) => {
                if(err) throw err;

              });
            }
            
          }
            
            
        });
        }
    });
  });
