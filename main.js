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
    let flatField = field.field.flat(1);
    let userLocation = 0;

    // DEBUGGING
    console.log(flatField);
    console.log('User location: ', userLocation);

    while (x < 1) {
        // Display game board
        field.print();
        
        // Get input from user and ensure input is valid
        let userInput = prompt("Which way? u, d, r, or l... ");
        
        if (userInput !== 'd' && userInput !== 'u' && userInput !== 'r' && userInput !== 'l') {
            console.log('Must enter either u, d, r, or l. Try again.');
            const userInput = prompt("Which way? u, d, r, or l... ");
        }

        // Transform user input into a number
        let convertedInput = 0;

        if (userInput === 'u') {
            convertedInput = (boardLength * -1);
        } else if (userInput === 'r') {
            convertedInput = 1;
        } else if (userInput === 'd') {
            convertedInput = boardLength;
        } else if (userInput === 'l') {
            convertedInput = -1;
        }
        
        //// Determine whether the latest move ends the game ////

        // Determine total length of board
        const wholeBoardAsRange = [...Array(flatField.length).keys()];

        // // Check if  user is going up and off the board
        // if (userLocation < boardLength && userInput === 'u') {
        //     console.log('You went off the board! GAME OVER.')
        //     x++;
        // // Check if user if going right and off the board    
        // } else if (userLocation % (boardLength - 1) === 0 && userInput === 'r') {
        //     console.log('You went off the board! GAME OVER.')
        //     x++;
        // // Check if the user is going down and off the board
        // } else if (userLocation + boardLength > wholeBoard && userInput === 'd') {
        //     console.log('You went off the board! GAME OVER.')
        //     x++;
        // // Check if the user is going left and off the board
        // } else if (userLocation % boardLength === 0 && userInput === 'l') {
        //     console.log('You went off the board! GAME OVER.')
        //     x++;

        // Check if user went off the board 
        if (!(wholeBoardAsRange.includes(userLocation + convertedInput))) {
            console.log('You went off the board! GAME OVER.')
            x++;
        // Check if the user fell into a hole
        } else if (flatField[userLocation + convertedInput] === 'O') {
            console.log('You fell into a hole! GAME OVER.')
            x++;
        // Check if user reached found the hat
        } else if (flatField[userLocation + convertedInput] === '^') {
            console.log('You found the hat! YOU WIN.');
            x++;
        // If game isn't ended by user's move, mark their move on the board
        } else {
            userLocation += convertedInput;
            flatField[userLocation] = '*';
        }

        // DEBUGGING
        console.log(flatField);
        console.log('User location: ', userLocation);
        console.log('Current index: ', userLocation);
        console.log('Converted input: ', convertedInput);

    }
}

playGame(myField);
