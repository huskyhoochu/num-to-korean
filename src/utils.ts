export function splitEvery<T>(n: number, arr: Array<T>): Array<Array<T>> {
  const result = [];
  let index = 0;

  while (index < arr.length) {
    result.push(arr.slice(index, (index += n)));
  }

  return result;
}
