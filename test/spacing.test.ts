import { numToKorean, FormatOptions } from '../src';

describe('띄어쓰기 결과물 테스트', () => {
  test('만 단위 테스트', () => {
    const answers = [
      {
        korean: '사만 삼백칠',
        num: 40_307,
      },
      {
        korean: '이십오만 삼천사백구십팔',
        num: 253_498,
      },
      {
        korean: '삼백일십이만 칠천오백일십이',
        num: 3_127_512,
      },
      {
        korean: '이천오십만 육백구',
        num: 20_500_609,
      },
    ];

    answers.forEach((answer) => {
      expect(numToKorean(answer.num, FormatOptions.SPACING)).toBe(answer.korean);
    });
  });

  test('억 단위 테스트', () => {
    const answers = [
      {
        korean: '오억 삼천만 이십일',
        num: 530_000_021,
      },
      {
        korean: '칠십일억 팔천삼백육십구만 사천이백오십이',
        num: 7_183_694_252,
      },
      {
        korean: '일백삼억 구십칠만 육',
        num: 10_300_970_006,
      },
      {
        korean: '사천이백육십팔억 삼천칠백사만 구십',
        num: 426_837_040_090,
      },
    ];

    answers.forEach((answer) => {
      expect(numToKorean(answer.num, 'spacing')).toBe(answer.korean);
    });
  });

  test('단위로 끝나는 숫자는 띄어쓰기가 생략되어야 함', () => {
    const answers = [
      {
        korean: '이억',
        num: 200_000_000,
      },
      {
        korean: '삼조',
        num: 3_000_000_000_000,
      },
      {
        korean: '사백억 이만',
        num: 40_000_020_000,
      },
    ];

    answers.forEach((answer) => {
      expect(numToKorean(answer.num, FormatOptions.SPACING)).toBe(answer.korean);
    });
  });
});
