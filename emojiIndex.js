const fs = require('fs');
const emojiTree = require('emoji-tree');
// const userinput = require('./userinputTest');
const userinput = require('./userInput');

const emojiLiderBoard = [];
userinput.forEach(({ value }) => {
  const parsedString = emojiTree(value);
  parsedString.forEach(({ type, text }) => {
    if (type === 'emoji') {
      // const searchEmoji = emojiLiderBoard.filter(emojis => emojis.emoji === text);
      const searchEmoji = emojiLiderBoard.findIndex(emojis => emojis.emoji === text);
      console.log('searchEmojis', searchEmoji);
      if (searchEmoji > -1) {
        emojiLiderBoard[searchEmoji].counter = emojiLiderBoard[searchEmoji].counter + 1;
      } else {
        const obj = {
          emoji: text,
          counter: 1,
        };
        emojiLiderBoard.push(obj);
      }
      console.log(text);
    }
  });
});
console.log(emojiLiderBoard);
let matrix = [];
emojiLiderBoard.forEach(({ emoji, counter }, col) => {
  if (!matrix[col]) {
    matrix[col] = [];
  }
  matrix[col][0] = emoji;
  matrix[col][1] = counter;
});

console.log('ggg', matrix);
const csvContent = matrix.join('\n');
console.log(csvContent);
matrix = matrix.sort();

const max = Math.max(...matrix.map(items => items.length));
console.log(max);
let csv = '';

for (let i = 0; i < max; i += 1) {
  for (let j = 0; j < matrix.length; j += 1) {
    csv += `${matrix[j][i] || ''};`;
  }

  csv += '\n';
}
console.log(csv);
// fs.writeFileSync('utterances.csv', csv);

fs.writeFileSync('LaMer.csv', csvContent);
