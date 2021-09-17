const fs=require("fs");
const cheerio=require("cheerio");

let htmlkadata=fs.readFileSync("./index.html");

let ch=cheerio.load(htmlkadata);
let pTag=ch(".main");
console.log(pTag);