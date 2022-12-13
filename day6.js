import fs from "fs";

const inputString = fs.readFileSync('day6input.txt', {encoding: 'utf-8'});
// const inputString = 'nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg'

function outerLoop() {
    for (let i = 0; i < inputString.length; i++) {
        if (innerLoop(i)) {
            return;
        }
    }
}

function innerLoop(i) {
    const map = {};
    map[inputString[i]] = 1;

    let counter = 1;

    for(let index = i + 1; index < inputString.length; index++) {
        const currentChar = inputString[index];
        if (map[currentChar]) {
            return;
        }

        map[currentChar] = 1;

        counter++;
        if (counter === 14) {
            console.log(index + 1);
            return true;
        }
    }
}

outerLoop();