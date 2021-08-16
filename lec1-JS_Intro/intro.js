//output anything on console
console.log("hello world!!");
//top to down
//left to right

//javascript datatypes: Number(int, double, float, big int), Boolean, String('a', "asfdasdf"), undefined, Object()
// in java c++: DataType varibaleName = value;
// in JS we use let or const nd both are block scoped variables
let a=10;
let b=true;
let c=undefined;
console.log(a);
console.log(b);
console.log(c);

let d;// if not assigned a value it is given undefined 
console.log(d);

if(true){
    let f="inside a block";
    console.log(f);
    console.log(a);
}
//console.log(f);//doesnot work outside it's block
//const datatype is also like let only only that its value is constant and cannot be changes.
 const pi=3.14; //reassignment is not allowed
 a=a+1;
 console.log(a);
 //pi=pi+1; // error here because we cannor change values of a const variable
 
 console.log(pi); 

// == se data type chech nahi hota sirf value matlab integer 10 or string "10 same hai iske liye"

//=== se data type bhi check hota hai

a=10;
b="10";
if(a==b){
    console.log("yes 10=='10'");
}
if(a===b){
    console.log("yes 10==='10'");
}
else{
    console.log("no 10==='10' is false");
}

// objects-> an key, value pair

let data= {
    name:"steve rogers",
    age: 100,
    team:"avengers",
    first_movie : {  // nesting allowed
        name:"captain america",
        rating: 8
    },
    //we can even put arrays inside objects
    movies : ["captain america", "avengers", "civil war"], 
};

console.log(data);

//to access objects key
//dot operation => lineral check
console.log(data.name);
console.log(data.first_movie.rating);
console.log(data.movies[1]);

let key="name";
data.key;
console.log(data.key);

//we cannot pas a vairable we need to search like this with dot notaion
// now we use bracket notation 
console.log(data[key]);

data.name="new value";
console.log(data[key]);
//in loop
for(let k in data){
    console.log(data[k]);
}

// keys=> unique, values=>duplicate

//Arrays




