const fs = require('fs');
const input = require('./userinputTest');

const EmojisRecognizer = require('./emojis/emoji-recogniser');

function searchCategory() {
  let str = '';
  input.forEach(({ value }) => {
    console.log(value);
    str += value;
  });
  return str;
}

const a = searchCategory();

const { blackListed, notIncluded, included } = new EmojisRecognizer(a);

const matrix = [];
blackListed.forEach(({ emoji, counter }, col) => {
  if (!matrix[col]) {
    matrix[col] = [];
  }
  matrix[col][0] = emoji;
  matrix[col][1] = counter;
});

console.log('ggg', matrix);
const csvContent = matrix.join('\n');
// console.log(csvContent);
// matrix = matrix.sort();

// const max = Math.max(...matrix.map(items => items.length));
// console.log(max);
// let csv = '';

// for (let i = 0; i < max; i += 1) {
//   for (let j = 0; j < matrix.length; j += 1) {
//     csv += `${matrix[j][i] || ''};`;
//   }

//   csv += '\n';
// }
// console.log(csv);
// fs.writeFileSync('utterances.csv', csv);

fs.writeFileSync('bademoji.csv', csvContent);


const matrix1 = [];
included.forEach(({ emoji, counter }, col) => {
  if (!matrix1[col]) {
    matrix1[col] = [];
  }
  matrix1[col][0] = emoji;
  matrix1[col][1] = counter;
});

console.log('ggg', matrix1);
const csvContent1 = matrix1.join('\n');
// matrix1 = matrix1.sort();

// const max1 = Math.max(...matrix1.map(items => items.length));
// console.log(max);
// let csv1 = '';

// for (let i = 0; i < max1; i += 1) {
//   for (let j = 0; j < matrix1.length; j += 1) {
//     csv1 += `${matrix1[j][i] || ''};`;
//   }

//   csv1 += '\n';
// }
// console.log(csv1);
// fs.writeFileSync('utterances.csv', csv);

fs.writeFileSync('included.csv', csvContent1);


const matrix2 = [];
notIncluded.forEach(({ emoji, counter }, col) => {
  if (!matrix2[col]) {
    matrix2[col] = [];
  }
  matrix2[col][0] = emoji;
  matrix2[col][1] = counter;
});

const csvContent2 = matrix2.join('\n');
// matrix1 = matrix1.sort();

// const max1 = Math.max(...matrix1.map(items => items.length));
// console.log(max);
// let csv1 = '';

// for (let i = 0; i < max1; i += 1) {
//   for (let j = 0; j < matrix1.length; j += 1) {
//     csv1 += `${matrix1[j][i] || ''};`;
//   }

//   csv1 += '\n';
// }
// console.log(csv1);
// fs.writeFileSync('utterances.csv', csv);

fs.writeFileSync('notincluded.csv', csvContent2);
