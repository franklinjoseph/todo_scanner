var fs = require('fs');
var { resolve } = require('path');
 

console.log(" ===================== Welcome to todo app scanner!");
console.log(" ===================== This app will scan all the files in the current directory for 'TODO' and list them in the console");
console.log(" ===================== Current Directory: " + __dirname);

function startSearch(dir) {
    var tempDir = ''
    //read the contents of the directory
    fs.readdir(dir, (err, dirContents) => {
        //loop through the contents
        dirContents.forEach(async (dirOrFile) => {
            //find the type of the directory content
            fs.lstat(dir + '/' + dirOrFile, async (err, stats) => {
                if(err) return console.log(err); //Handle error
                if(stats.isFile()) {
                    //handle for file
                    //read file
                    fs.readFile(dir + '/' + dirOrFile, (err, fileContents) => {
                        if(err) {
                            console.log('cannot read this file: ' + dirOrFile, 'reason: ' + err);
                            return err;
                        }
                        if(fileContents.indexOf('TODO') >= 0 || fileContents.indexOf('todo') >= 0) {
                            console.log("TODO detected: " + dir + '/' + dirOrFile);
                        }
                    })
                } else if(stats.isDirectory()) {
                    //handle for sub-directory
                    
                    //get updated directory path
                    tempDir = resolve(dir, dirOrFile)
                    //invoke recursion & repeat the process for the sub directory
                    startSearch(tempDir);
                }
            })
        })
    });
}

//invoke scanning for 'TODO'
startSearch(__dirname);
