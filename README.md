# NumToKorean

> 숫자를 한글 표기로 변환해주는 함수

## Summary

NumToKorean은 숫자를 한글 표기로 변환해주는 함수입니다. 간단한 하나의 함수만 있습니다. 일의자리부터 경 단위까지의 모든 숫자를 한글로 변환해줍니다. 은행 등 금액을 다루어야 하는 환경에서 편리하게 사용할 수 있습니다.

## Installation

```
// npm
npm install num-to-korean

// yarn
yarn add num-to-korean
```

## Usage

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
