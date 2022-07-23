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
      expect(numToKorean(answer.num, FormatOptions.LINGUAL)).toBe(answer.korean);
    });
  });

  test('일의자리의 "일"은 생략되어선 안 된다', () => {
    const answers = [
      {
        korean: '일',
        num: 1,
      },
    ];

    answers.forEach((answer) => {
      expect(numToKorean(answer.num, FormatOptions.LINGUAL)).toBe(answer.korean);
    });
  });

  test('십의자리의 첫 글자로 들어오는 "일"은 생략된다', () => {
    const answers = [
      {
        korean: '십칠',
        num: 17,
      },
      {
        korean: '이십일',
        num: 21,
      },
      {
        korean: '십일',
        num: 11,
      },
      {
        korean: '십',
        num: 10,
      }
    ];

    answers.forEach((answer) => {
      expect(numToKorean(answer.num, FormatOptions.LINGUAL)).toBe(answer.korean);
    });
  });

  test('백의자리의 첫 글자로 들어오는 "일"은 생략된다', () => {
    const answers = [
      {
        korean: '백육십일',
        num: 161,
      },
      {
        korean: '사백십삼',
        num: 413,
      },
      {
        korean: '육백일',
        num: 601,
      },
      {
        korean: '백십일',
        num: 111,
      },
      {
        korean: '백',
        num: 100,
      }
    ];

    answers.forEach((answer) => {
      expect(numToKorean(answer.num, FormatOptions.LINGUAL)).toBe(answer.korean);
    });
  });

  test('천의자리의 첫 글자로 들어오는 "일"은 생략된다', () => {
    const answers = [
      {
        korean: '천팔백일',
        num: 1_801,
      },
      {
        korean: '이천삼백십',
        num: 2_310,
      },
      {
        korean: '천백',
        num: 1_100,
      },
      {
        korean: '천백십일',
        num: 1_111,
      },
      {
        korean: '천',
        num: 1_000,
      }
    ];

    answers.forEach((answer) => {
      expect(numToKorean(answer.num, FormatOptions.LINGUAL)).toBe(answer.korean);
    });
  });

  test('만의자리일 때 만의자리의 "일"은 생략되어야 한다', () => {
    const answers = [
      {
        korean: '만팔천오백이',
        num: 18_502,
      },
      {
        korean: '만천팔백사십구',
        num: 11_849,
      },
      {
        korean: '이만팔천백십사',
        num: 28_114,
      },
      {
        korean: '만천백십일',
        num: 11_111,
      },
      {
        korean: '만',
        num: 10_000,
      },
    ];

    answers.forEach((answer) => {
      expect(numToKorean(answer.num, FormatOptions.LINGUAL)).toBe(answer.korean);
    });
  });

  test('십만자리 이상일 때 만, 억, 조 단위의 "일"은 생략되어선 안 된다', () => {
    const answers = [
      {
        korean: '십일만삼천사백오십육',
        num: 113_456,
      },
      {
        korean: '백십일만삼천팔백일',
        num: 1_113_801,
      },
      {
        korean: '천백삼십일만삼천백삼',
        num: 11_313_103,
      },
      {
        korean: '일억천백구십일만삼백사십',
        num: 111_910_340,
      },
      {
        korean: '천백십일억천백십일만천백십일',
        num: 111_111_111_111,
      },
      {
        korean: '일조천삼백십사억사천삼백육십오만육천백이십삼',
        num: 1_131_443_656_123
      }
    ];

    answers.forEach((answer) => {
      expect(numToKorean(answer.num, FormatOptions.LINGUAL)).toBe(answer.korean);
    });
  });

  test("십만자리 이상부터 0으로만 채워진 숫자", () => {
    const answers = [
      {
        korean: '십만',
        num: 100_000,
      },
      {
        korean: '백만',
        num: 1_000_000,
      },
      {
        korean: '천만',
        num: 10_000_000,
      },
      {
        korean: '일억',
        num: 100_000_000,
      },
      {
        korean: '십억',
        num: 1_000_000_000,
      },
      {
        korean: '백억',
        num: 10_000_000_000,
      },
      {
        korean: '천억',
        num: 100_000_000_000,
      },
      {
        korean: '일조',
        num: 1_000_000_000_000,
      },
    ];

    answers.forEach((answer) => {
      expect(numToKorean(answer.num, FormatOptions.LINGUAL)).toBe(answer.korean);
    });
  });
});
