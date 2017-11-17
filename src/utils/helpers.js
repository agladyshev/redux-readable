export function capitalize (str = '') {
  return typeof str !== 'string'
    ? ''
    : str[0].toUpperCase() + str.slice(1)
}

export const mapValuesToArray = (array) => {
  console.log(array)
  // return array.map((elem) => elem[1])
  return array[1]
}