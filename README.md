# :kr: NumToKorean

[![Build Status](https://travis-ci.org/huskyhoochu/num-to-korean.svg?branch=master)](https://travis-ci.org/huskyhoochu/num-to-korean) [![](https://data.jsdelivr.com/v1/package/npm/num-to-korean/badge?style=rounded)](https://www.jsdelivr.com/package/npm/num-to-korean)

> 숫자를 한글 표기로 변환해주는 함수

## Summary

NumToKorean은 숫자를 한글 표기로 변환해주는 함수입니다. 간단한 하나의 함수만 있습니다. 일의자리부터 경 단위까지의 모든 숫자를 한글로 변환해줍니다. 은행 등 금액을 다루어야 하는 환경에서 편리하게 사용할 수 있습니다.

소개 페이지: [금액-한글 변환 프로젝트 npm 배포하기 | Huskyhoochu 기술 블로그](https://www.huskyhoochu.com/num-to-korean/)

:warning: **본 프로젝트는 IE를 지원하지 않습니다. 호환성을 유지하고자 한다먼 직접 polyfill을 설치할 것을 권장합니다.**

## v0.4.0 Change

- 함수 설계를 변경했습니다. 한 덩어리였던 함수를 기능 별로 세분화했습니다.
- 'MIXED' 모드에서 잘못된 값 및 0은 모두 '0'을 출력합니다.

## Installation

```
// npm
npm install num-to-korean

// yarn
yarn add num-to-korean

// jsdelivr
<script src="https://cdn.jsdelivr.net/npm/num-to-korean@0.4.0/dist/num-to-korean.min.js"></script>

// unpkg
<script src="https://unpkg.com/num-to-korean@0.4.0/dist/num-to-korean.min.js"></script>
```

## Usage

### Basic: 기본 변환

```
// ES5
const { numToKorean } = require('num-to-korean');

const billion = numToKorean(100000000);
// -> '일억'
```

```
// After ES6
import { numToKorean } from 'num-to-korean';

const number = numToKorean(12345678);
// -> '일천이백삼십사만오천육백칠십팔'
```

```
// Browser
<script>
  var num = document.getElementById('num').innerText;
  document.getElementById('korean').innerText = numToKorean.numToKorean(parseInt(num, 10));
</script>
```

### Spacing: 만 단위 띄어쓰기

[한글 맞춤법 44항](http://kornorms.korean.go.kr/regltn/regltnView.do?regltn_code=0001&regltn_no=264#a264)에 따라 만 단위 띄어쓰기를 지원합니다. ([#6](https://github.com/huskyhoochu/num-to-korean/issues/6))

```
import { numToKorean, FormatOptions } from 'num-to-korean';

const spacing = numToKorean(5677746724, FormatOptions.SPACING);
// -> 오십육억 칠천칠백칠십사만 육천칠백이십사
```

`FormatOptions`는 반드시 직접 import할 필요 없이 `spacing` 문자열만 입력해도 관계 없습니다.

```
const spacing = numToKorean(24234224, 'spacing');
// -> 이천사백이십삼만 사천이백이십사
```

### Mixed: 숫자-단위 병기

mixed 옵션을 사용하면 숫자는 기존의 숫자를, 단위수는 한글로 표현할 수 있습니다. 천 단위 쉼표 또한 자동으로 포함됩니다.

```
import { numToKorean, FormatOptions } from 'num-to-korean';

numToKorean(30864627, FormatOptions.MIXED);
// -> 3,086만 4,627

numTokorean(927483041001, 'mixed'); // 문자열 'mixed' 입력 가능
// -> 9,274억 8,304만 1,001
```

## Test

```
yarn test
```

`test` 폴더에 기초적인 테스트 케이스를 추가해두었습니다.
