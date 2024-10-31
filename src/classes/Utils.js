export const delay = (callback, timeOut = 20) => setTimeout(callback, timeOut);

export const randomId = (length = 6) => {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
}

export const randomIdOnlyNumber = (length = 6) => {
  let result = '';
  const characters = '123456789';
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
}

export function randomNumber(min, max) { // min and max included 
  const result = Math.floor(Math.random() * (max - min + 1) + min)
  console.log(result)
  return result
}

export const sortRandom = (arr) => {
  const array = [...arr]
  for (let i = array.length - 1; i > 0; i--) { 
    const j = Math.floor(Math.random() * (i + 1)); 
    [array[i], array[j]] = [array[j], array[i]]; 
  } 
  return array; 
}

export const sortBy = (field) => {
  return (a, b) => { return a[field] - b[field] }
}

export const stringContains = (arrayOfString, longString) => {
  return arrayOfString.some(v => longString.includes(v))
}

export const filterUniqByKey = (key) => {
  return (value, index, self) => self.findIndex(v => v[key] === value[key]) === index
}

export const createArray = (number, startAt = 0) => {
  if (number <= 0) return []
  const arr = [...Array(number).keys()]
  
  if (startAt) 
    return [...arr].map(i => i+startAt)

  return arr
}

export const JSONreset = (obj) => {
  return JSON.parse(JSON.stringify(obj))
}