import { numToKorean, FormatOptions } from '../src/num-to-korean';

describe('혼합 표기 테스트', () => {
  test('천 단위 이하 테스트', () => {
    const answers = [
      {
        korean: '0',
        num: 0,
      },
      {
        korean: '5',
        num: 5,
      },
      {
        korean: '63',
        num: 63,
      },
      {
        korean: '287',
        num: 287,
      },
      {
        korean: '4,862',
        num: 4862,
      }
    ];

    answers.forEach((answer) => {
      expect(numToKorean(answer.num, FormatOptions.MIXED)).toBe(answer.korean);
    });
  });

  test('만 단위 테스트', () => {
    const answers = [
      {
        korean: '1만 1',
        num: 10_001,
      },
      {
        korean: '57만 523',
        num: 570_523,
      },
      {
        korean: '602만 702',
        num: 6_020_702,
      },
      {
        korean: '3,086만 4,627',
        num: 30_864_627,
      }
    ];

    answers.forEach((answer) => {
      expect(numToKorean(answer.num, FormatOptions.MIXED)).toBe(answer.korean);
    });
  });


  test('억 단위 테스트', () => {
    const answers = [
      {
        korean: '5억',
        num: 500_000_000,
      },
      {
        korean: '70억 827만 35',
        num: 7_008_270_035,
      },
      {
        korean: '698억 30만 270',
        num: 69_800_300_270,
      },
      {
        korean: '9,274억 8,304만 1,001',
        num: 927_483_041_001,
      },
    ];

    answers.forEach((answer) => {
      expect(numToKorean(answer.num, FormatOptions.MIXED)).toBe(answer.korean);
    });
  })
});