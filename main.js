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

const playGame = field => {
    // Create placeholder to end while loop
    let x = 0;
    // Identify how long each row is
    const boardLength = field.field[0].length;
    // Track current user location
    let userLocation = field.field[0][0];

    while (x < 1) {
        // Display game board
        field.print();
        
        // Get input from user and ensure input is valid
        let userInput = prompt("Which way? u, d, r, or l... ");
        
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
        }
        
        // Transform user input into a number
        let convertedInput = 0;

        if (userInput === 'u') {
            convertedInput = (boardLength * -1);
        } else if (userInput === 'r') {
            convertedInput = 1;
        } else if (userInput === 'd') {
            convertedInput = (boardLength);
        } else if (userInput === 'l') {
            convertedInput = -1;
        }

       // Determine where the next move would be to
       let nextSpot = field.field[currentIndex + convertedInput];
       
        // Check if the user fell into a hole
        if (nextSpot === 'O') {
            console.log('You fell into a hole! GAME OVER.')
            x++;
        }

        // Check if user reached found the hat
        if (nextSpot === '^') {
            console.log('You found the hat! YOU WIN.');
            x++;
        }

        ////////

        // If game isn't ended by user's move, mark their move on the board
        nextSpot = '*';
    }
}

playGame(myField);
