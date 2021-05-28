const prompt = require('prompt-sync')({sigint: true});

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';

class Field {
    constructor(field) {
        this.field = field;
    }

    print() {
        for (let i = 0; i < this.field.length; i++) {
            this.field[i][this.field.length - 1] += "\n";
        }

        const merged = this.field.flat(1);
        
        console.log(merged.join(''));
    }
}

const myField = new Field([
    [pathCharacter, fieldCharacter, hole],
    [fieldCharacter, hole, fieldCharacter],
    [fieldCharacter, hat, fieldCharacter]
]);

// Task 4
// create while loop that runs while the game is running - use a global var
// print the game board
// prompt user for direction - if the input is invalid, let user know and prompt again
// if user moves without ending the game, change moved to tile to the user icon
// when game ends, tell user and change var to end the while loop



const playGame = field => {
    // Create placeholder to end while loop
    let x = 0;
    
    // Identify how long each row is
    const boardLength = field.field[0].length;
    
    // Track current user location
    let userLocation = field.field[0][0];

    while (x < 1) {

        // **Not sure if I need this...
        // // Set value of u, d, r, and l
        // let u;
        // let d;
        // let r;
        // let l;
        
        // Display game board
        field.print();
        
        // Get input from user and ensure input is valid
        const userInput = prompt("Which way? u, d, r, or l... ");
        
        if (userInput !== 'd' && userInput !== 'u' && userInput !== 'r' && userInput !== 'l') {
            console.log('Must enter either u, d, r, or l. Try again.');
            const userInput = prompt("Which way? u, d, r, or l... ");
        }
        
        //// Determine whether the latest move ends the game ////

        // Flatten nested arrays into one array & determine total length
        field.field.flat(1);
        const wholeBoard = field.field.length;
        // Current index of userLocation
        let currentIndex = field.field.indexOf(userLocation, userLocation - 1);
        
        // Check if  user is going up and off the board
        if (currentIndex < boardLength && userInput === 'u') {
            console.log('You went off the board! GAME OVER.')
            x++;
        // Check if user if going right and off the board    
        } else if (currentIndex % (boardLength - 1) === 0 && userInput === 'r') {
            console.log('You went off the board! GAME OVER.')
            x++;
        // Check if the user is going down and off the board
        } else if (currentIndex + boardLength > wholeBoard && userInput === 'd') {
            console.log('You went off the board! GAME OVER.')
            x++;
        // Check if the user is going left and off the board
        } else if (currentIndex % boardLength === 0 && userInput === 'l') {
            console.log('You went off the board! GAME OVER.')
            x++;
        // Check if the user is going left and off the board
        }

    }
}

playGame(myField);
