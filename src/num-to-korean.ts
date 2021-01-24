import { dropLastWhile, splitEvery } from './utils';

// 한글로 바꿀 숫자 배열
const textSymbol = ['', '일', '이', '삼', '사', '오', '육', '칠', '팔', '구'];
// 4자리마다 반복되는 자릿수 배열
const powerSymbol = ['', '십', '백', '천'];
// 4자리마다 커지는 단위수 배열
const dotSymbol = ['', '만', '억', '조', '경'];

// eslint-disable-next-line no-restricted-globals
const isInteger = (num: number): boolean => isFinite(num) && Math.floor(num) === num;

const validate = (num: number): number => (isInteger(num) ? num : 0);

const getAtomic = (num: number): (string | number)[][] =>
  num
    .toString()
    .split('')
    .map((numText: string) => parseInt(numText, 10))
    .reverse()
    .map((item: number, index: number) => {
      const powerIndex = index % 4;
      const dotIndex = Math.ceil(index / 4);

      const power = item === 0 ? '' : powerSymbol[powerIndex];
      const dot = powerIndex === 0 ? dotSymbol[dotIndex] : '';

      return [item, power, dot];
    });

const reduceAtomic = (atomic: (string | number)[][]): string[] => {
  const reduce = atomic.map((item) => {
    const newItem = [...item];
    newItem[0] = textSymbol[newItem[0] as number] || '';
    return newItem.join('');
  });

  return splitEvery(4, reduce)
    .map((item) => (dotSymbol.indexOf(item.join('')) > 0 ? ['', '', '', ''] : item))
    .reduce((acc: string[], val: string[]) => acc.concat(val), [])
    .reverse();
};

const addSpacing = (reduced: string[]): string =>
  reduced.filter((token: string) => token)
    .map((token: string) => {
      if (dotSymbol.indexOf(token.slice(-1)) > 0) {
        return `${token} `;
      }
      return token;
    })
    .join('')
    .trim();

const removeOneStr = (list: string[]): string[] => {
  if (list.length === 1) {
    return list;
  }

  const filtered: string[] = [];

  for (let i = 0; i < list.length; i += 1) {
    // 일의자리의 "일"은 생략되어선 안 된다
    if (i === list.length - 1) {
      filtered.push(list[i]);
      break;
    }

    // 십만자리 이상일 때 만, 억, 조 단위의 "일"은 생략되어선 안 된다
    // 다만 만의자리일 때 만의자리의 "일"은 생략되어야 한다
    if (list.length > 5 && dotSymbol.indexOf(list[i].slice(1)) > 0) {
      filtered.push(list[i]);
      // eslint-disable-next-line no-continue
      continue;
    }

    // 그 외의 "일"은 생략된다
    if (list[i].slice(0, 1) === textSymbol[1]) {
      filtered.push(list[i].slice(1));
    } else {
      filtered.push(list[i]);
    }
  }

  return filtered;
}

const getNormal = (num: number): string =>
  reduceAtomic(getAtomic(validate(num))).join('');

const getLingual = (num: number): string =>
  removeOneStr(reduceAtomic(getAtomic(validate(num)))).join('');

const getSpacing = (num: number): string =>
  addSpacing(reduceAtomic(getAtomic(validate(num))));

const getMixed = (num: number): string => {
  const mixedAtomic = getAtomic(validate(num)).map(
    (item) => `${item[0]}${item[2]}`
  );
  const reduced = splitEvery(4, mixedAtomic)
    .map((item) => {
      const droppedZero = dropLastWhile(
        (x: string) => parseInt(x, 10) === 0,
        item
      );

      if (droppedZero.length === 4) {
        droppedZero.splice(3, 0, ',');
      }

      return droppedZero;
    })
    .reduce((acc: string[], val: string[]) => acc.concat(val), [])
    .reverse();

  const result = addSpacing(reduced);
  return result === '' ? '0' : result;
};

export const FormatOptions = {
  SPACING: 'spacing',
  MIXED: 'mixed',
  LINGUAL: 'lingual',
};

/**
 * Converts a number to Korean notation.
 * @param num A number to convert into Korean notation.
 * @param formatOptions A string to select a format.
 */
export function numToKorean(num: number, formatOptions?: string): string {
  if (formatOptions === FormatOptions.SPACING) {
    return getSpacing(num);
  }

  if (formatOptions === FormatOptions.MIXED) {
    return getMixed(num);
  }

  if (formatOptions === FormatOptions.LINGUAL) {
    return getLingual(num);
  }

  return getNormal(num);
}
