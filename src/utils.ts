export function splitEvery<T>(n: number, arr: Array<T>): Array<Array<T>> {
  const result = [];
  let index = 0;

  while (index < arr.length) {
    result.push(arr.slice(index, (index += n)));
  }

  return result;
}

export function dropLastWhile<T>(pred: (x: T) => boolean, arr: Array<T>): Array<T> {
  let index = arr.length -1;

  while(index >= 0 && pred(arr[index])) {
    index -= 1;
  }

  return arr.slice(0, index + 1);
}
