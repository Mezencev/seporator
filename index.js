const fs = require('fs');

const file = fs.createWriteStream('includedTest.js');
const file1 = fs.createWriteStream('includedCategory.js');
const includedEmojis = require('./combo');
const includedCategory = require('./included2');

file.write('module.exports = [');
includedEmojis.forEach((emoji) => {
  console.log(emoji.Unicode);
  const unicode = emoji.Unicode;
  const emojis = unicode.toString().replace(/([U+])/g, '');
  const str = emojis.replace(/\r?\n/g, '-');
  if (emojis.length) {
    const arr = str.replace(/([ ])/g, '-');
    file.write(`'${arr}', \n`);
  }
});
file.write('];\n');
file.end();


file1.write('module.exports = [');
includedCategory.forEach((emoji) => {
  const emojis = emoji.Unicode.replace(/([U+])/g, '');
  const str = emojis.replace(/\r?\n/g, '-');
  if (emojis.length) {
    const arr = str.replace(/([ ])/g, '-');
    const obj = { unicode: arr, category: emoji['Emoji Category'] };
    console.log(obj);
    file1.write(`${JSON.stringify(obj)}, \n`);
  }
});
file1.write('];\n');
file1.end();
