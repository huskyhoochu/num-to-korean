# :kr: NumToKorean

[![Build Status](https://travis-ci.org/huskyhoochu/num-to-korean.svg?branch=master)](https://travis-ci.org/huskyhoochu/num-to-korean) [![](https://data.jsdelivr.com/v1/package/npm/num-to-korean/badge?style=rounded)](https://www.jsdelivr.com/package/npm/num-to-korean)

> 숫자를 한글 표기로 변환해주는 함수

## Summary

NumToKorean은 숫자를 한글 표기로 변환해주는 함수입니다. 간단한 하나의 함수만 있습니다. 일의자리부터 경 단위까지의 모든 숫자를 한글로 변환해줍니다. 은행 등 금액을 다루어야 하는 환경에서 편리하게 사용할 수 있습니다.

소개 페이지: [금액-한글 변환 프로젝트 npm 배포하기 | Huskyhoochu 기술 블로그](https://www.huskyhoochu.com/num-to-korean/)

## Roadmap

- 음수 표기 대응 (-12,345 -> 마이너스 일만이천삼백사십오)

## v0.5.0 Change

- 코드 가독성을 좋게 하고 유지보수를 쉽게 하기 위해 객체지향 프로그래밍으로 재설계했습니다. 핵심 로직은 변하지 않았습니다.

## v0.4.2 Change

- 구어체 및 구어체 띄어쓰기 기능을 추가했습니다. 구어체란 1,201 같은 숫자를 "일천이백일" 처럼 직역하는 것이 아니라 "천이백일"처럼 우리가 일상생활에서 편하게 쓰는 말로 번역해주는 기능을 말합니다. 구어체 띄어쓰기는 기존 띄어쓰기처럼 만 단위에서 띄어쓰는 기능을 말합니다.

#### 구어체 규칙

1. 일의자리의 "일"은 생략되어선 안 된다. (1 -> "일")
2. 십의자리부터 만의자리까지 일의자리를 제외한 "일"은 생략된다. (11,111 -> "만천백십일")
3. 십만자리 이상일 떄 만, 억, 조 단위의 "일"은 생략되어선 안 된다. (111,111,111,111 -> "천백십일억천백십일만천백십일")

## v0.4.1 Change

- NumToKorean이 드디어 IE 11, 10, 9를 지원합니다. :tada:

## Installation

```
// npm
npm install --save num-to-korean

// yarn
yarn add num-to-korean

// jsdelivr
<script src="https://cdn.jsdelivr.net/npm/num-to-korean@0.5.0/dist/num-to-korean.min.js"></script>

// unpkg
<script src="https://unpkg.com/num-to-korean@0.5.0/dist/num-to-korean.min.js"></script>
```

## Usage

### Basic: 기본 변환

```
// Require
const { numToKorean } = require('num-to-korean');

const billion = numToKorean(100000000);
// -> '일억'
```

```
// Import
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

### Lingual: 구어체

lingual 옵션을 사용하면 우리가 일상생활에서 쓰는 구어체 형태로 표현할 수 있습니다.

```
import { numToKorean, FormatOptions } from 'num-to-korean';

numToKorean(112231, FormatOptions.LINGUAL);
// -> 십일만이천이백삼십일

numToKorean(1111, 'lingual');
// -> 천백십일
```

### Lingual Spacing: 구어체 띄어쓰기

구어체 모드와 띄어쓰기 모드가 혼합된 경우입니다.

```
import { numToKorean, FormatOptions } from 'num-to-korean';

numToKorean(1241353, FormatOptions.LINGUAL_SPACING);
// -> 백이십사만 천삼백오십삼

numToKorean(182418101, 'lingual_spacing');
// -> 일억 팔천이백사십일만 팔천백일
```

## Test

```
yarn test
```

`test` 폴더에 기초적인 테스트 케이스를 추가해두었습니다.
