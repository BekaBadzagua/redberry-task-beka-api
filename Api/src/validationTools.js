module.exports = (
  text,
  required = false,
  onlyLetters = false,
  email = false,
  isNum = false,
  isFloat=false
) => {
  let isValid = true;

  const LETTERS = /^[A-Za-z]+$/;
  const EMAIL = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const NUM = /^[0-9]+$/;
  const FLOAT=/^-?\d+(?:[.,]\d*?)?$/
  if (required && (text.length <= 0 || text === ' ')) isValid = false;
  if (onlyLetters && !text.match(LETTERS)) isValid = false;
  if (email && !text.match(EMAIL)) isValid = false;
  if (isNum && !text.match(NUM)) isValid = false;
  if (isFloat && !text.match(FLOAT)) isValid = false;

  return isValid;
};
