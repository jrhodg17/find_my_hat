const importedPlayGame = require('./playGame.js');

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
            console.log(this.field[i].join(''));
        }
    }

    static generateField(height, width) {
        const heightRange = [...Array(height).keys()];
        const widthRange = [...Array(width).keys()];

        let fieldArray = [];

        for (let i = 0; i < heightRange.length; i++) {
            fieldArray.push([]);
        }

        for (let i = 0; i < fieldArray.length; i++) {
            for (let j = 0; j < widthRange.length; j++) {
                const chars = [fieldCharacter, fieldCharacter, hole];
                let randomChar = chars[Math.floor(Math.random() * chars.length)];
                fieldArray[i].push(randomChar);
            }
        }

        const randomRow = heightRange[Math.floor(Math.random() * heightRange.length)];
        const randomColumn = widthRange[Math.floor(Math.random() * widthRange.length)];

        fieldArray[randomRow][randomColumn] = hat;
        fieldArray[0][0] = pathCharacter;
        
        return fieldArray;
    }
}

const genField = Field.generateField(4, 6);
const myField = new Field(genField);

importedPlayGame.playGame(myField);
