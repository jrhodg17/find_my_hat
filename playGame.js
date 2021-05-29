const prompt = require('prompt-sync')({sigint: true});

const playGame = field => {
    // Identify how long each row is
    const boardLength = field.field[0].length;

    // Flatten the nested arrays into one
    let flatField = field.field.flat(1);

    // Save array of range of number of elements in board
    const wholeBoardAsRange = [...Array(flatField.length).keys()];

    // Track current user location
    let userLocation = 0;

    // Create placeholder to end while loop
    let x = 0;

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

            // Change the board
            let placeholderList = [];
            let placeholderSliceValTwo = boardLength;

            for (let i = 0; i < boardLength * field.field.length; i += boardLength) {
                placeholderList.push(flatField.slice(i, placeholderSliceValTwo));
                placeholderSliceValTwo += boardLength;
            }

            field.field = placeholderList;
        }
    }
}

module.exports.playGame = playGame;