import { numToKorean, FormatOptions } from '../src/num-to-korean';

describe('구어체 테스트', () => {
  test('예외 값 처리', () => {
    const answers = [
      {
        korean: '',
        num: 0,
      },
      {
        korean: '',
        num: NaN,
      },
      {
        korean: '',
        num: Infinity,
      },
      {
        korean: '',
        num: -Infinity,
      },
    ];

    answers.forEach((answer) => {
      expect(numToKorean(answer.num, FormatOptions.LINGUAL_SPACING)).toBe(answer.korean);
    });
  });

  test('만의자리 띄어쓰기', () => {
    const answers = [
      {
        korean: '만 팔천오백이',
        num: 18_502,
      },
      {
        korean: '만 천팔백사십구',
        num: 11_849,
      },
      {
        korean: '이만 팔천백십사',
        num: 28_114,
      },
      {
        korean: '만 천백십일',
        num: 11_111,
      },
      {
        korean: '만',
        num: 10_000,
      },
    ];

    answers.forEach((answer) => {
      expect(numToKorean(answer.num, FormatOptions.LINGUAL_SPACING)).toBe(answer.korean);
    });
  });

  test('십만자리 이상 띄어쓰기', () => {
    const answers = [
      {
        korean: '십일만 삼천사백오십육',
        num: 113_456,
      },
      {
        korean: '백십일만 삼천팔백일',
        num: 1_113_801,
      },
      {
        korean: '천백삼십일만 삼천백삼',
        num: 11_313_103,
      },
      {
        korean: '일억 천백구십일만 삼백사십',
        num: 111_910_340,
      },
      {
        korean: '천백십일억 천백십일만 천백십일',
        num: 111_111_111_111,
      },
      {
        korean: '일조 천삼백십사억 사천삼백육십오만 육천백이십삼',
        num: 1_131_443_656_123
      }
    ];

    answers.forEach((answer) => {
      expect(numToKorean(answer.num, FormatOptions.LINGUAL_SPACING)).toBe(answer.korean);
    });
  });
});
