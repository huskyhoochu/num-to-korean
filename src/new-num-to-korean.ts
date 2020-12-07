import { dropLastWhile, splitEvery } from './utils';

// 한글로 바꿀 숫자 배열
const textSymbol = ['', '일', '이', '삼', '사', '오', '육', '칠', '팔', '구'];
// 4자리마다 반복되는 자릿수 배열
const powerSymbol = ['', '십', '백', '천'];
// 4자리마다 커지는 단위수 배열
const dotSymbol = ['', '만', '억', '조', '경'];

class NTK {
  num: number;

  atomic: (string | number)[][];

  constructor(num: number) {
    this.num = num;
    this.atomic = [];
  }

  validate() {
    if (!Number.isInteger(this.num)) {
      return 0;
    }

    return this.num;
  }

  getAtomic() {
    const atomic = this.validate()
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
    this.atomic = atomic;
    return this;
  }

  reduce() {
    const reduce = this.atomic.map(item => {
      const newItem = [...item];
      newItem[0] = textSymbol[newItem[0] as number] || '';
      return newItem.join('');
    });

    return splitEvery(4, reduce)
      .map((item) => dotSymbol.includes(item.join('')) ? [] : item)
      .reduce((acc: string[], val: string[]) => acc.concat(val), [])
      .reverse();
  }

  getNormal() {
    return this.reduce().join('');
  }

  getSpacing() {
    return this.reduce()
      .filter((token: string) => token)
      .map((token: string) => {
        if (dotSymbol.includes(token.slice(-1))) {
          return `${token} `;
        }
        return token;
      })
      .join('')
      .trim();
  }

  getMixed() {
    const reduce = this.atomic.map((item: (string | number)[]) => `${item[0]}${item[2]}`);
    const result = splitEvery(4, reduce)
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
      .reverse()
      .map((token: string) => {
        if (dotSymbol.includes(token.slice(-1))) {
          return `${token} `;
        }
        return token;
      })
      .join('')
      .trim();
    
    return result === '' ? '0' : result;
  }
}

const SPACING = 'spacing';
const MIXED = 'mixed';

type formatOptions = typeof SPACING | typeof MIXED;

export const FormatOptions: {
  SPACING: formatOptions;
  MIXED: formatOptions;
} = {
  SPACING,
  MIXED,
}

/**
 * Converts a number to Korean notation.
 * @param {number} num A number to convert into Korean notation.
 * @param {formatOptions} [formatOptions] A string to select a format.
 */
export function numToKorean(num: number, format?: formatOptions): string {
  const ntk = new NTK(num);

  if (format === FormatOptions.SPACING) {
    return ntk.getAtomic().getSpacing();
  }

  if (format === FormatOptions.MIXED) {
    return ntk.getAtomic().getMixed();
  }

  return ntk.getAtomic().getNormal();
}
