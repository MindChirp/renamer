const fs = require("file-system");
const path = require("path");
const readline = require("readline");

var pathToEdit = path.join(__dirname + "/../");



fs.readdir(pathToEdit, (err, files) => {
    files.forEach(file => {
      var dateVal = null;
      var title = null;
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
              dateVal = line.split("content=")[1].substring(1,11).split("-");
            }
            
          }
          if(line.split("<title>").length > 1) {
            title = line.split("<title>")[1].substring(0, line.split("<title>")[1].length - 8)
          }

          if(dateVal != null && title != null) {
            fs.rename(pathToEdit + "/" + file, pathToEdit + "/" + title + "_" + dateVal[0] + dateVal[1] + dateVal[2] + ".html", (err) => {
                if(err) throw err;

              });  
          }
           
            
        });
        }
    });
  });
