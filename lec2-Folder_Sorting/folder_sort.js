const { KeyObject } = require("crypto");
const fs = require("fs");
const path=require('path');
const { createInflate } = require("zlib");
//let folderpathex='./Downloads';
let folderpath='./Downloads';
let extensions=require('./util');
let extFolderPath;

function checkfolder(extension){
    //check if extension is matching with a folder name
    //.jpg => images
    for(let key in extensions){
        if(extensions[key].includes(extension)){
            extFolderPath=`${folderpath}/${key}`;
            break;
        } 
    }
    return fs.existsSync(extFolderPath);
}

function createfolder(){
    
    fs.mkdirSync(extFolderPath);
}

function movefile(fileName,folderpath){
    let sourcepath=`${folderpath}/${fileName}`;
    //console.log(folderpath);
    let destinationpath=`${extFolderPath}/${fileName}`;
    fs.copyFileSync(sourcepath,destinationpath);
    if(sourcepath !== destinationpath){
        fs.unlinkSync(sourcepath);
    }

}

function sortFolder(folderpath){
    // get content of the folderpath
    let content=fs.readdirSync(folderpath);
    for(let i=0;i<content.length;i++){

        let isdir=fs.lstatSync(`${folderpath}/${content[i]}`).isDirectory();

        if(isdir){
            console.log("it is a folder");
            sortFolder(`${folderpath}/${content[i]}`);
        }
        else{
            let extensionName=path.extname(content[i]);

            // console.log(content[i]);
            // console.log(extensionName);

            let extensionfolderexist=checkfolder(extensionName);
            if(extensionfolderexist){
             //movefile
             movefile(content[i],folderpath);
            }
            else{
                //createfile
                createfolder();
                //movefile
                movefile(content[i],folderpath);
            }
            }
            //get extension of each file
            
    }
}

sortFolder(folderpath);

