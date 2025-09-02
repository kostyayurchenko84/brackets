module.exports = function check(str, bracketsConfig) {
  const stack = [];

  const bracketPairs = {};
  for (let i = 0; i < bracketsConfig.length; i += 1) {
    const open = bracketsConfig[i][0];
    const close = bracketsConfig[i][1];
    bracketPairs[open] = close;
  }

  const validBrackets = new Set();
  for (let i = 0; i < bracketsConfig.length; i += 1) {
    const open = bracketsConfig[i][0];
    const close = bracketsConfig[i][1];
    validBrackets.add(open);
    validBrackets.add(close);
  }

  for (let i = 0; i < str.length; i += 1) {
    const char = str[i];

    if (validBrackets.has(char)) {
      if (char in bracketPairs) {
        if (bracketPairs[char] !== char) {
          stack.push(char);
        } else if (stack.length > 0 && stack[stack.length - 1] === char) {
          stack.pop();
        } else {
          stack.push(char);
        }
      } else {
        if (stack.length === 0) return false;

        const lastIn = stack.pop();
        if (bracketPairs[lastIn] !== char) {
          return false;
        }
      }
    }
  }

  return stack.length === 0;
};
