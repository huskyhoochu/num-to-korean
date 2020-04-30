import { splitEvery, dropLastWhile } from './utils';

// 한글로 바꿀 숫자 배열
const textSymbol = ['', '일', '이', '삼', '사', '오', '육', '칠', '팔', '구'];
// 4자리마다 반복되는 자릿수 배열
const powerSymbol = ['', '십', '백', '천'];
// 4자리마다 커지는 단위수 배열
const dotSymbol = ['', '만', '억', '조', '경'];

export enum FormatOptions {
  SPACING = 'spacing',
  MIXED = 'mixed',
}

/**
 * Converts a number to Korean notation.
 * @param {number} num A number to convert into Korean notation.
 * @param {string} [formatOptions] A string to select a format.
 */
export function numToKorean(num: number, formatOptions?: string): string {
  const options = formatOptions || '';

  // 예외 값 처리
  if (!Number.isInteger(num)) {
    return '';
  }

  // MIXED 옵션에서는 0을 '0'으로 표기
  if (num === 0 && options === FormatOptions.MIXED) {
    return '0';
  }

  // 숫자를 한글 배열로 변환
  const koreanArr = num
    .toString()
    .split('')
    .map((numText: string) => parseInt(numText, 10))
    .reverse()
    .map((item: number, index: number) => {
      const powerIndex = index % 4;
      const dotIndex = Math.ceil(index / 4);

      const text = textSymbol[item];
      const power = item === 0 ? '' : powerSymbol[powerIndex];
      const dot = powerIndex === 0 ? dotSymbol[dotIndex] : '';

      if (options === FormatOptions.MIXED) {
        return `${item}${dot}`;
      }

      return `${text}${power}${dot}`;
    });

  // 불필요하게 첨가된 단위 제거
  const removeUnused = splitEvery(4, koreanArr)
    .map((slicedByDot: string[]) => {
      if (options === FormatOptions.MIXED) {
        const droppedZero = dropLastWhile((x: string) => parseInt(x, 10) === 0, slicedByDot);

        if (droppedZero.length === 4) {
          droppedZero.splice(3, 0, ',');
        }

        return droppedZero;
      }

      return dotSymbol.includes(slicedByDot.join('')) ? [] : slicedByDot;
    });

  // 문자열 변환
  const result = removeUnused
    .reduce((acc: string[], val: string[]) => acc.concat(val), [])
    .reverse()
    .filter((token: string) => token)
    .map((token: string) => {
      if (options && dotSymbol.includes(token.slice(-1))) {
        return `${token} `;
      }

      return token;
    })
    .join('')
    .trim();

  return result;
}
