const convertToCamelCase = (hyphenatedWord) => {
  const characters = hyphenatedWord.split('');

  const newArray = characters.map((character, index) => {
    if (characters[index - 1] === '-') {
      return character.toUpperCase();
    } else if (character !== '-') {
      return character;
    }
  });

  const camelCasedWord = newArray.join('');

  return camelCasedWord;
};

export default convertToCamelCase;