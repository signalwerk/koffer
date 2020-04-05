// https://tomspencer.dev/blog/2014/11/16/short-id-generation-in-javascript/

// this is a reduced alphabet to not be confused width
// combinations like 0 ≠ O, I ≠ l
const ALPHABET = '123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ'
const ID_LENGTH = 8

const generate = () => {
  let id = ''
  for (let i = 0; i < ID_LENGTH; i++) {
    id += ALPHABET.charAt(Math.floor(Math.random() * ALPHABET.length))
  }
  return id
}

export default generate
