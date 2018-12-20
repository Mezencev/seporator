const emojiTree = require('emoji-tree');

const {
  blackListSingle, blackListCombo, notIncluded, includedWithCategory,
} = require('../emojis');

function raw(input) {
  if (input.length === 1) return input.charCodeAt(0);
  const comp = (
    (input.charCodeAt(0) - 0xD800) * 0x400
    + (input.charCodeAt(1) - 0xDC00) + 0x10000
  );
  if (comp < 0) return input.charCodeAt(0);
  return comp;
}

function emojiUnicode(input) {
  let rawCode = raw(input).toString('16');
  if (rawCode.length === 2) rawCode = `00${rawCode}`;
  return rawCode;
}

function formatEmojiUnicode(emojiUnicodes) {
  return emojiUnicodes.map(emoji => emoji.join('_'));
}

function isInIncluded(unicode) {
  return includedWithCategory.find((emojiWCategory) => {
    if (emojiWCategory.unicode === unicode.join('-').toUpperCase()) return true;
    return false;
  });
}

class EmojisRecognizer {
  constructor(inputString) {
    const parsedString = emojiTree(inputString);
    this.string = parsedString.filter(str => str.type === 'text');
    this.emojis = parsedString.filter(char => char.type === 'emoji');
    this.included = [];
    this.blackListed = [];
    // this.badCombos = [];
    this.notIncluded = [];
    this.categories = [];
    this.valid = true;
    this.generateUnicode();
    this.findNotIncluded();
    this.findBad();
    // this.findBadCombo();
    this.findIncluded();
    // this.selectCategories();
    // this.lambdaPrepare();
  }

  generateUnicode() {
    this.emojis.forEach((emoji) => {
      emoji.unicode = [...emoji.text].map(el => emojiUnicode(el));
    });
  }

  findBad() {
    this.emojis.forEach((emoji) => {
      if (blackListSingle.includes(emoji.unicode.join('-').toUpperCase())) {
        const searchEmoji = this.blackListed.findIndex(emojis => emojis.emoji === emoji.text);
        console.log('searchEmojis', searchEmoji);
        if (searchEmoji > -1) {
          return this.blackListed[searchEmoji].counter = this.blackListed[searchEmoji].counter + 1;
        }
        const obj = {
          emoji: emoji.text,
          counter: 1,
        };
        return this.blackListed.push(obj);
      }
      // this.included.push({ text: emoji.text, unicode: emoji.unicode });
      this.valid = false;
    });
  }

  findNotIncluded() {
    this.emojis.forEach((emoji) => {
      if (notIncluded.includes(emoji.unicode.join('-').toUpperCase())) {
        const searchEmoji = this.notIncluded.findIndex(emojis => emojis.emoji === emoji.text);
        console.log('searchEmojis', searchEmoji);
        if (searchEmoji > -1) {
          this.notIncluded[searchEmoji].counter = this.notIncluded[searchEmoji].counter + 1;
        } else {
          const obj = {
            emoji: emoji.text,
            counter: 1,
          };
          this.notIncluded.push(obj);
        }

        // his.included.push({ text: emoji.text, unicode: emoji.unicode });
        this.valid = false;
      }
    });
  }

  // findBadCombo() {
  //   this.emojis.forEach((emoji, index) => {
  //     const nextEmoji = this.emojis[index + 1];
  //     if (!nextEmoji) return;
  //     const currentPair = `${emoji.unicode.join('-').toUpperCase()}-${this.emojis[index + 1].unicode.join('-').toUpperCase()}`;
  //     blackListCombo.find((badCombo) => {
  //       if (badCombo !== currentPair) return false;
  //       this.blackListed.push(`${emoji.text} ${this.emojis[index + 1].text}`);
  //       this.valid = false;
  //       return true;
  //     });
  //   });
  // }

  // lambdaPrepare() {
  //   this.lambdaFormat = formatEmojiUnicode(this.included.map(emoji => emoji.unicode));
  // }

  findIncluded() {
    this.emojis.forEach((emoji) => {
      const originalUnicode = emoji.unicode;
      if (isInIncluded(originalUnicode)) {
        const searchEmoji = this.included.findIndex(emojis => emojis.emoji === emoji.text);
        console.log('searchEmojis', searchEmoji);
        if (searchEmoji > -1) {
          return this.included[searchEmoji].counter = this.included[searchEmoji].counter + 1;
        }
        const obj = {
          emoji: emoji.text,
          counter: 1,
        };
        return this.included.push(obj);
      }

      const firstFeofIndex = emoji.unicode.indexOf('fe0f');
      if (firstFeofIndex !== -1) {
        const withoutFirstFeof = originalUnicode.filter((v, i) => i !== firstFeofIndex);
        if (isInIncluded(withoutFirstFeof)) {
          const searchEmoji = this.included.findIndex(emojis => emojis.emoji === emoji.text);
          console.log('searchEmojis', searchEmoji);
          if (searchEmoji > -1) {
            return this.included[searchEmoji].counter = this.included[searchEmoji].counter + 1;
          }
          const obj = {
            emoji: emoji.text,
            counter: 1,
          };
          return this.included.push(obj);
        }
        // return this.included.push({ text: emoji.text, unicode: withoutFirstFeof });
      }

      const secondFeofIndex = emoji.unicode.indexOf('fe0f', firstFeofIndex + 1);
      if (secondFeofIndex !== -1) {
        const withoutSecondFeof = originalUnicode.filter((v, i) => i !== secondFeofIndex);
        if (isInIncluded(withoutSecondFeof)) {
          const searchEmoji = this.included.findIndex(emojis => emojis.emoji === emoji.text);
          console.log('searchEmojis', searchEmoji);
          if (searchEmoji > -1) {
            return this.included[searchEmoji].counter = this.included[searchEmoji].counter + 1;
          }
          const obj = {
            emoji: emoji.text,
            counter: 1,
          };
          return this.included.push(obj);
        }
        // return this.included.push({ text: emoji.text, unicode: withoutSecondFeof });
      }

      if (![firstFeofIndex, secondFeofIndex].includes(-1)) {
        const withoutBothFeof = originalUnicode.filter((v, i) => (
          ![firstFeofIndex, secondFeofIndex].includes(i)
        ));
        if (isInIncluded(withoutBothFeof)) {
          const searchEmoji = this.included.findIndex(emojis => emojis.emoji === emoji.text);
          console.log('searchEmojis', searchEmoji);
          if (searchEmoji > -1) {
            return this.included[searchEmoji].counter = this.included[searchEmoji].counter + 1;
          }
          const obj = {
            emoji: emoji.text,
            counter: 1,
          };
          return this.included.push(obj);
        }
        // return this.included.push({ text: emoji.text, unicode: withoutBothFeof });
      }

      return false;
    });
  }

  // selectCategories() {
  //   this.included.forEach((emoji) => {
  //     includedWithCategory.find((emojiWCategory) => {
  //       if (emojiWCategory.unicode !== emoji.unicode.join('-').toUpperCase()) return false;
  //       this.categories.push(emojiWCategory.category);

  //       return true;
  //     });
  //   });
  // }
}

module.exports = EmojisRecognizer;
