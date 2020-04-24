import { numToKorean } from '../src';

describe('숫자 금액을 한글로 변환하기 테스트', () => {
  test('잘못된 값 처리', () => {
    const answers = [
      {
        korean: '',
        num: 0,
      },
      {
        korean: '',
        num: NaN,
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
        num: 1000,
      },
      {
        korean: '일만',
        num: 10000,
      },
      {
        korean: '일십만',
        num: 100000,
      },
      {
        korean: '일백만',
        num: 1000000,
      },
      {
        korean: '일천만',
        num: 10000000,
      },
      {
        korean: '일억',
        num: 100000000,
      },
      {
        korean: '일십억',
        num: 1000000000,
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
        num: 134234,
      },
      {
        korean: '일백삼십만구',
        num: 1300009,
      },
      {
        korean: '이천오백만오천',
        num: 25005000,
      },
      {
        korean: '일억이천만일',
        num: 120000001,
      },
      {
        korean: '사억오천오십만일천이십',
        num: 450501020,
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
        num: 1000020000007000,
      },
      {
        korean: '일경',
        num: 10000000000000000,
      },
    ];

    answers.forEach((answer) => {
      expect(numToKorean(answer.num)).toBe(answer.korean);
    });
  });
});
