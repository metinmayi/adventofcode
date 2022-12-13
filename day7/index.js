import fs from "fs";
import util from "util";

main();
function main() {
    const lines = getInput();
    const tree = {
        name: '/',
        isDirectory: true,
        parentNode: null,
        size: 0,
        children: []
    };
    let currentNode = tree;

    for (const line of lines) {
        const isCommand = line[0] === '$';
        const isChangeDirectory = line.split(' ')[1] === 'cd';

        if (isCommand) {
            if (isChangeDirectory) {
                debugger;
                const target = line.split(' ')[2];
                if (target === '/') {
                    currentNode = tree;
                } else if (target === '..') {
                    currentNode = currentNode.parentNode;
                } else {
                    const foundNode  = currentNode.children.find((x) => x.isDirectory && x.name === target);
                    currentNode = foundNode;
                }
            }
            continue;
        }

        const isDirectory = line.split(' ')[0] === 'dir';
        if (isDirectory) {
            const name = line.split(' ')[1];
            const node = {
                name,
                isDirectory: true,
                parentNode: currentNode,
                size: 0,
                children: []
            };
            currentNode.children.push(node);
            continue;
        }

        const size = line.split(' ')[0];
        currentNode.size += +size;
    }

    // console.log(util.inspect(tree, false,null, true));

    console.log(getSize(tree));
}

function getSize(node) {
    debugger;
    if (! node.isDirectory) {
        return node.size < 100000 ? node.size : 0;
    }
    let childrenSize = 0;
    for (const child of node.children) {
        const childSize = getSize(child);
        childrenSize += childSize;
    }
    return childrenSize;
}

function getInput() {
    const rawInput = fs.readFileSync('input.txt', {encoding: 'utf-8'});
    return rawInput.trim().split('\n');
}