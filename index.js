import fs from "fs";

const stacks = getStacks();
const moves = getMoves();

for (const [amount, from, to] of moves) {
    const batch = [];
    for (let i = 0; i < amount; i++) {
        batch.unshift(stacks[from].pop());
    }
    stacks[to] = [...stacks[to], ...batch];
}

console.log(getLastLetters());





function getStacks() {
    return {
        1: ['Q', 'F', "M", "R", "L", "W", "C", "V"],
        2: ["D", "Q", "L"],
        3: ['P', "S", "R", "G", "W", "C", "N", "B"],
        4: ["L", "C", "D", "H", "B", "Q", "G"],
        5: ["V", "G", "L", "F", "Z", "S"],
        6: ["D", "G", "N", "P"],
        7: ["D", "Z", "P", "V", "F", "C", "W"],
        8: ["C", "P", "D", "M", "S"],
        9: ["Z", "N", "W", "T", "V", "M", "P", "C"]
    };
}

function getMoves(){
    const stringz = fs.readFileSync('input.txt', {encoding: 'utf-8'});

    const moves = stringz
    .split('\n').
    map(m => {
        const matches = m.match(/\d+/g);
        return matches.map(Number);
    })
    return moves;
}

function getLastLetters(){
    const letters = Object.values(stacks).map(stack => stack.pop());
    return letters.join("");
}
