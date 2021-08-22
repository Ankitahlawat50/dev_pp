let a=10;
console.log(a);
function change2(){
    console.log(a);
}
function change(){
    a=20;
    change2();
}
change();
console.log(a);