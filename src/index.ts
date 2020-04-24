import { splitEvery, flatten } from './utils';

// 한글로 바꿀 숫자 배열
const textSymbol = ['', '일', '이', '삼', '사', '오', '육', '칠', '팔', '구'];
// 4자리마다 반복되는 자릿수 배열
const powerSymbol = ['', '십', '백', '천'];
// 4자리마다 커지는 단위수 배열
const dotSymbol = ['', '만', '억', '조', '경'];

export function numToKorean(num: number): string {
  if (Number.isNaN(num)) {
    return '';
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

      return `${text}${power}${dot}`;
    });

  // 불필요하게 첨가된 단위 제거
  const removeUnusedDot = splitEvery(4, koreanArr)
    .filter((slicedByDot: string[]) => !dotSymbol.includes(slicedByDot.join('')));

  return flatten(removeUnusedDot).reverse().join('');
}
