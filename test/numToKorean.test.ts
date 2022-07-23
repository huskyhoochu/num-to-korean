import { numToKorean, FormatOptions } from '../src/num-to-korean';

describe('숫자 금액을 한글로 변환하기 테스트', () => {
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
      expect(numToKorean(answer.num)).toBe(answer.korean);
    });
  });

  test('일의자리', () => {
    const answers = [
      {
        korean: '일',
        num: 1,
      },
      {
        korean: '삼',
        num: 3,
      },
      {
        korean: '구',
        num: 9,
      },
    ];

    answers.forEach((answer) => {
      expect(numToKorean(answer.num)).toBe(answer.korean);
    });
  });

  test('모든 자릿수가 숫자로 찼을 때', () => {
    const answer = {
      korean: '일십이억삼천사백오십육만칠천팔백구십팔',
      num: 1234567898,
    };
    expect(numToKorean(answer.num)).toBe(answer.korean);
  });

  test('모든 자릿수가 숫자로 찼을 때: NORMAL 옵션', () => {
    const answer = {
      korean: '일십이억삼천사백오십육만칠천팔백구십팔',
      num: 1234567898,
    };
    expect(numToKorean(answer.num, FormatOptions.NORMAL)).toBe(answer.korean);
  });

  test('모든 자릿수가 0일 때', () => {
    const answers = [
      {
        korean: '일십',
        num: 10,
      },
      {
        korean: '일백',
        num: 100,
      },
      {
        korean: '일천',
        num: 1_000,
      },
      {
        korean: '일만',
        num: 10_000,
      },
      {
        korean: '일십만',
        num: 100_000,
      },
      {
        korean: '일백만',
        num: 1_000_000,
      },
      {
        korean: '일천만',
        num: 10_000_000,
      },
      {
        korean: '일억',
        num: 100_000_000,
      },
      {
        korean: '일십억',
        num: 1_000_000_000,
      },
    ];

    answers.forEach((answer) => {
      expect(numToKorean(answer.num)).toBe(answer.korean);
    });
  });

  test('0과 0이 아닌 숫자가 섞였을 때', () => {
    const answers = [
      {
        korean: '일십삼만사천이백삼십사',
        num: 134_234,
      },
      {
        korean: '일백삼십만구',
        num: 1_300_009,
      },
      {
        korean: '이천오백만오천',
        num: 25_005_000,
      },
      {
        korean: '일억이천만일',
        num: 120_000_001,
      },
      {
        korean: '사억오천오십만일천이십',
        num: 450_501_020,
      },
    ];

    answers.forEach((answer) => {
      expect(numToKorean(answer.num)).toBe(answer.korean);
    });
  });

  test('극단적으로 큰 수', () => {
    const answers = [
      {
        korean: '일천조이백억칠천',
        num: 1_000_020_000_007_000,
      },
      {
        korean: '일경',
        num: 10_000_000_000_000_000,
      },
    ];

    answers.forEach((answer) => {
      expect(numToKorean(answer.num)).toBe(answer.korean);
    });
  });
});
