const { KeyObject } = require("crypto");
const fs = require("fs");
const path=require('path');
const { createInflate } = require("zlib");
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

function movefile(fileName){
    let sourcepath=`${folderpath}/${fileName}`;
    let destinationpath=`${extFolderPath}/${fileName}`;
    fs.copyFileSync(sourcepath,destinationpath);

    fs.unlinkSync(sourcepath);
}

function sortFolder(folderpath){
    // get content of the folderpath
    let content=fs.readdirSync(folderpath);
    for(let i=0;i<content.length;i++){
        //get extension of each file
        let extensionName=path.extname(content[i]);
        console.log(extensionName);

        let extensionfolderexist=checkfolder(extensionName);
        if(extensionfolderexist){
            //movefile
            movefile(content[i]);
        }
        else{
            //createfile
            createfolder();
            //movefile
            movefile(content[i]);
        }
    }
}

sortFolder(folderpath);

