import { numToKorean, FormatOptions } from '../src/num-to-korean';

describe('소수점 표기 테스트', () => {
  test('예외 값 처리', () => {
    const answers = [
      {
        korean: '0',
        num: 0,
      },
      {
        korean: '0',
        num: NaN,
      },
      {
        korean: '0',
        num: Infinity,
      },
      {
        korean: '0',
        num: -Infinity,
      },
    ];

    answers.forEach((answer) => {
      expect(numToKorean(answer.num, FormatOptions.FLOAT)).toBe(answer.korean);
    });
  });

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
        korean: '6.3십',
        num: 63,
      },
      {
        korean: '7십',
        num: 70,
      },
      {
        korean: '2.87백',
        num: 287,
      },
      {
        korean: '3.05천',
        num: 3_050,
      },
      {
        korean: '4.862천',
        num: 4_862,
      },
    ];

    answers.forEach((answer) => {
      expect(numToKorean(answer.num, FormatOptions.FLOAT)).toBe(answer.korean);
    });
  });

  test('만 단위 테스트', () => {
    const answers = [
      {
        korean: '1.0001만',
        num: 10_001,
      },
      {
        korean: '1.2345만',
        num: 12_345,
      },
      {
        korean: '57.0523만',
        num: 570_523,
      },
      {
        korean: '602.0702만',
        num: 6_020_702,
      },
      {
        korean: '3,086.4627만',
        num: 30_864_627,
      },
    ];

    answers.forEach((answer) => {
      expect(numToKorean(answer.num, FormatOptions.FLOAT)).toBe(answer.korean);
    });
  });

  test('억 단위 테스트', () => {
    const answers = [
      {
        korean: '5억',
        num: 500_000_000,
      },
      {
        korean: '1.302억',
        num: 130_200_000,
      },
      {
        korean: '70.08270035억',
        num: 7_008_270_035,
      },
      {
        korean: '698.0030027억',
        num: 69_800_300_270,
      },
      {
        korean: '9,274.83041001억',
        num: 927_483_041_001,
      },
    ];

    answers.forEach((answer) => {
      expect(numToKorean(answer.num, FormatOptions.FLOAT)).toBe(answer.korean);
    });
  });

  test('조 단위 테스트', () => {
    const answers = [
      {
        korean: '7.0000005조',
        num: 7_000_000_500_000,
      },
      {
        korean: '65.029098001조',
        num: 65_029_098_001_000,
      },
      {
        korean: '982.017837239001조',
        num: 982_017_837_239_001,
      },
      {
        korean: '1,293.909294645조',
        num: 1_293_909_294_645_000,
      },
    ];

    answers.forEach((answer) => {
      expect(numToKorean(answer.num, FormatOptions.FLOAT)).toBe(answer.korean);
    });
  });
});
