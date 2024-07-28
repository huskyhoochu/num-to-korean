import { Dot, dotSymbol, Power, powerSymbol, textSymbol } from './symbols';
import { dropLastWhile, splitEvery } from './utils';

interface Token {
  num: number;
  power: Power;
  dot: Dot;
}

export type Format =
  | 'normal'
  | 'spacing'
  | 'mixed'
  | 'lingual'
  | 'lingual_spacing'
  | 'float';

export const FormatOptions: {
  [key: string]: Format;
} = {
  NORMAL: 'normal', // 일반
  SPACING: 'spacing', // 띄어쓰기
  MIXED: 'mixed', // 한글 숫자 병기
  LINGUAL: 'lingual', // 구어체
  LINGUAL_SPACING: 'lingual_spacing', // 구어체 띄어쓰기
  FLOAT: 'float', // 소수점 표현
};

class NumToKorean {
  private originNum = 0;

  private readonly formatOption: Format = 'normal';

  private token: Token[] = [];

  private result: string[] = [];

  static isInteger(num: number): boolean {
    // eslint-disable-next-line no-restricted-globals
    return isFinite(num) && Math.floor(num) === num;
  }

  constructor(num: number, formatOption: Format) {
    this.originNum = NumToKorean.isInteger(num) ? num : 0;
    this.formatOption = formatOption;
  }

  private getToken(): NumToKorean {
    this.token = this.originNum
      .toString()
      .split('')
      .map((numText: string) => parseInt(numText, 10))
      .reverse()
      .map((num: number, index: number) => {
        const powerIndex = index % 4;
        const dotIndex = Math.ceil(index / 4);

        const power = num === 0 ? '' : powerSymbol[powerIndex];
        const dot = powerIndex === 0 ? dotSymbol[dotIndex] : '';

        return {
          num,
          power,
          dot,
        };
      });

    return this;
  }

  private flatToken(isMixed: boolean): NumToKorean {
    this.result = this.token.map((item) => {
      if (isMixed) {
        return `${item.num}${item.dot}`;
      }
      const numToText = textSymbol[item.num] || '';
      return `${numToText}${item.power}${item.dot}`;
    });

    return this;
  }

  private flatTokenForFloatMode(): NumToKorean {
    let dots: (Dot | Power)[] = [];
    let maxDot: string = '';

    this.token.forEach((item) => {
      dots.push(item.dot);
    });

    [maxDot] = dots.join('').split('').slice(-1);

    if (maxDot === undefined) {
      dots = [];
      this.token.forEach((item) => {
        dots.push(item.power);
      });

      [maxDot] = dots.join('').split('').slice(-1);

      this.result = this.token.map(
        (item) => `${item.num}${item.power === maxDot ? `.${item.power}` : ''}`,
      );

      return this;
    }

    this.result = this.token.map(
      (item) => `${item.num}${item.dot === maxDot ? `.${item.dot}` : ''}`,
    );

    return this;
  }

  private moveToDotLast(): NumToKorean {
    const matchResult = this.result.join('').match(/\.(십|백|천|만|억|조|경)/);

    if (matchResult) {
      const exactDot = matchResult[1];
      const removedDotResult = this.result
        .join('')
        .replace(/(십|백|천|만|억|조|경)/g, '')
        .split('');

      this.result = [...removedDotResult, exactDot];
    } else {
      this.result = this.result.map((item) => item.replace(/\./g, ''));
    }

    return this;
  }

  private removeUnnecessaryChars(): NumToKorean {
    this.result = this.result
      .join('')
      .replace(
        /\..*/,
        (match) => match.replace(/,/g, ''), // 불필요한 콤마 제거
      )
      .replace(/\.(?=[십백천만억조경]|$)/, '') // 모든 게 0으로 떨어져서 소수점만 남으면 소수점 제거
      .replace(
        /\.(\d*[1-9])?(0+)(?=[십백천만억조경])/,
        (_, p1) => (p1 ? `.${p1}` : ''), // 0으로 끝나 는소수점은 마지막 0 제거
      )
      .split('');

    return this;
  }

  private swapZeroToComma(): NumToKorean {
    this.result = splitEvery(4, this.result)
      .map((item) => {
        const droppedZero = dropLastWhile(
          (x: string) => parseInt(x, 10) === 0,
          item,
        );

        if (droppedZero.length === 4) {
          droppedZero.splice(3, 0, ',');
        }

        return droppedZero;
      })
      .reduce((acc: string[], val: string[]) => acc.concat(val), []);

    return this;
  }

  private onlyAddComma(): NumToKorean {
    this.result = splitEvery(4, this.result)
      .map((item) => {
        if (item.length === 4) {
          item.splice(3, 0, `,`);
        }

        return item;
      })
      .reduce((acc: string[], val: string[]) => acc.concat(val), []);

    return this;
  }

  private onlyReverse(): NumToKorean {
    this.result = this.result.reverse();

    return this;
  }

  private addEmptyPositionWhenSymbolHasValue(): NumToKorean {
    this.result = splitEvery(4, this.result)
      .map((item) =>
        dotSymbol.indexOf(<Dot>item.join('')) > 0 ? ['', '', '', ''] : item,
      )
      .reduce((acc: string[], val: string[]) => acc.concat(val), []);

    return this;
  }

  private addSpacing(): NumToKorean {
    this.result = this.result
      .filter((token: string) => token)
      .map((token: string) => {
        if (dotSymbol.indexOf(<Dot>token.slice(-1)) > 0) {
          return `${token} `;
        }
        return token;
      });

    return this;
  }

  private removeOneStr(): NumToKorean {
    if (this.result.length === 1) {
      return this;
    }

    const filtered: string[] = [];

    for (let i = 0; i < this.result.length; i += 1) {
      // 일의자리의 "일"은 생략되어선 안 된다
      if (i === this.result.length - 1) {
        filtered.push(this.result[i]);
        break;
      }

      // 십만자리 이상일 때 만, 억, 조 단위의 "일"은 생략되어선 안 된다
      // 다만 만의자리일 때 만의자리의 "일"은 생략되어야 한다
      if (
        this.result.length > 5 &&
        dotSymbol.indexOf(<Dot>this.result[i].slice(1)) > 0
      ) {
        filtered.push(this.result[i]);
        // eslint-disable-next-line no-continue
        continue;
      }

      // 그 외의 "일"은 생략된다
      if (this.result[i].slice(0, 1) === textSymbol[1]) {
        filtered.push(this.result[i].slice(1));
      } else {
        filtered.push(this.result[i]);
      }
    }

    this.result = filtered;
    return this;
  }

  private makeZeroIfResultEmpty(): NumToKorean {
    if (
      (this.result.length === 1 && this.result[0] === '') ||
      this.result.length === 0
    ) {
      this.result = ['0'];
    }
    return this;
  }

  private getResult(): string[] {
    return this.result;
  }

  private getNormal(): string {
    return this.getToken()
      .flatToken(false)
      .addEmptyPositionWhenSymbolHasValue()
      .onlyReverse()
      .getResult()
      .join('');
  }

  private getLingual(): string {
    return this.getToken()
      .flatToken(false)
      .addEmptyPositionWhenSymbolHasValue()
      .onlyReverse()
      .removeOneStr()
      .getResult()
      .join('');
  }

  private getSpacing(): string {
    return this.getToken()
      .flatToken(false)
      .addEmptyPositionWhenSymbolHasValue()
      .onlyReverse()
      .addSpacing()
      .getResult()
      .join('')
      .trim();
  }

  private getLingualSpacing(): string {
    return this.getToken()
      .flatToken(false)
      .addEmptyPositionWhenSymbolHasValue()
      .onlyReverse()
      .removeOneStr()
      .addSpacing()
      .getResult()
      .join('')
      .trim();
  }

  private getMixed(): string {
    return this.getToken()
      .flatToken(true)
      .swapZeroToComma()
      .onlyReverse()
      .addSpacing()
      .makeZeroIfResultEmpty()
      .getResult()
      .join('')
      .trim();
  }

  private getFloat(): string {
    return this.getToken()
      .flatTokenForFloatMode()
      .onlyAddComma()
      .onlyReverse()
      .moveToDotLast()
      .removeUnnecessaryChars()
      .makeZeroIfResultEmpty()
      .getResult()
      .join('')
      .trim();
  }

  public getKorean(): string {
    if (this.formatOption === FormatOptions.SPACING) {
      return this.getSpacing();
    }

    if (this.formatOption === FormatOptions.MIXED) {
      return this.getMixed();
    }

    if (this.formatOption === FormatOptions.LINGUAL) {
      return this.getLingual();
    }

    if (this.formatOption === FormatOptions.LINGUAL_SPACING) {
      return this.getLingualSpacing();
    }

    if (this.formatOption === FormatOptions.NORMAL) {
      return this.getNormal();
    }

    if (this.formatOption === FormatOptions.FLOAT) {
      return this.getFloat();
    }

    return this.getNormal();
  }
}

/**
 * Converts a number to Korean notation.
 * @param num A number to convert into Korean notation.
 * @param formatOptions A string to select a format.
 */
export function numToKorean(num: number, formatOptions?: Format): string {
  const k = new NumToKorean(num, formatOptions || FormatOptions.NORMAL);
  return k.getKorean();
}
