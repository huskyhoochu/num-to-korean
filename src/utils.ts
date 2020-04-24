export function splitEvery<T>(n: number, arr: Array<T>): Array<Array<T>> {
  const result = [];
  let index = 0;

  while (index < arr.length) {
    result.push(arr.slice(index, (index += n)));
  }

  return result;
}

export function flatten<T>(arr: Array<Array<T>>): Array<T> {
  const result = [];

  for (let i = 0; i < arr.length; i += 1) {
    for (let j = 0; j < arr[i].length; j += 1) {
      result.push(arr[i][j]);
    }
  }

  return result;
}
