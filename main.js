const importedFunc = require('./playGame.js');

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
            fieldArray.push(widthRange);
        }
        
        return fieldArray;
    }
}

// const myField = new Field([
//     [pathCharacter, fieldCharacter, hole],
//     [fieldCharacter, hole, fieldCharacter],
//     [fieldCharacter, hat, fieldCharacter]
// ]);

// importedFunc.playGame(myField);

const genField = Field.generateField(3, 4);
const myField = new Field(genField);

myField.print();
