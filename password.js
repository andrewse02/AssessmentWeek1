const { read } = require("fs");
const readline = require("readline");

const reader = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let length = false;
let number = false;
const numberRegEx = /[0-9]+/g;
let letter = false;
const letterRegEx = /[a-zA-Z]+/g
let noSpace = false;
const passwordChecks = [];
let pass = true;

reader.question("Validate your password: ", function(password) {
    if(password.length >= 10) length = true;
    if(numberRegEx.test(password)) number = true;
    if(letterRegEx.test(password)) letter = true;
    if(!password.trim().includes(" ")) noSpace = true;

    passwordChecks.push(length, number, letter, noSpace);

    let output = `
 __   __  _______  ___      ___   ______     _______  _______  _______  _______  _     _  _______  ______    ______   __  
|  | |  ||   _   ||   |    |   | |      |   |       ||   _   ||       ||       || | _ | ||       ||    _ |  |      | |  | 
|  |_|  ||  |_|  ||   |    |   | |  _    |  |    _  ||  |_|  ||  _____||  _____|| || || ||   _   ||   | ||  |  _    ||  | 
|       ||       ||   |    |   | | | |   |  |   |_| ||       || |_____ | |_____ |       ||  | |  ||   |_||_ | | |   ||  | 
|       ||       ||   |___ |   | | |_|   |  |    ___||       ||_____  ||_____  ||       ||  |_|  ||    __  || |_|   ||__| 
 |     | |   _   ||       ||   | |       |  |   |    |   _   | _____| | _____| ||   _   ||       ||   |  | ||       | __  
  |___|  |__| |__||_______||___| |______|   |___|    |__| |__||_______||_______||__| |__||_______||___|  |_||______| |__| 
    `;

    for(let i = 0; i < passwordChecks.length; i++) {
        const condition = passwordChecks[i];

        if(!condition) {
            output = `
 ___   __    _  __   __  _______  ___      ___   ______     _______  _______  _______  _______  _     _  _______  ______    ______   __  
|   | |  |  | ||  | |  ||   _   ||   |    |   | |      |   |       ||   _   ||       ||       || | _ | ||       ||    _ |  |      | |  | 
|   | |   |_| ||  |_|  ||  |_|  ||   |    |   | |  _    |  |    _  ||  |_|  ||  _____||  _____|| || || ||   _   ||   | ||  |  _    ||  | 
|   | |       ||       ||       ||   |    |   | | | |   |  |   |_| ||       || |_____ | |_____ |       ||  | |  ||   |_||_ | | |   ||  | 
|   | |  _    ||       ||       ||   |___ |   | | |_|   |  |    ___||       ||_____  ||_____  ||       ||  |_|  ||    __  || |_|   ||__| 
|   | | | |   | |     | |   _   ||       ||   | |       |  |   |    |   _   | _____| | _____| ||   _   ||       ||   |  | ||       | __  
|___| |_|  |__|  |___|  |__| |__||_______||___| |______|   |___|    |__| |__||_______||_______||__| |__||_______||___|  |_||______| |__| 
            `;
            pass = false;
            break;
        }
    }

    if(!pass) {
        // Check length
        if(!passwordChecks[0]) {
            output += "\nYour password must be at least 10 characters long!";
        }

        // Check number
        if(!passwordChecks[1]) {
            output += "\nYour password must contain a number!";
        }

        // Check letter
        if(!passwordChecks[2]) {
            output += "\nYour password must contain a letter!";
        }

        // Check noSpace
        if(!passwordChecks[3]) {
            output += "\nYour password must not contain spaces!";
        }
    }

    console.log(output);

    reader.close();
});