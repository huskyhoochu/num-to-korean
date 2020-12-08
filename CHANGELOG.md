# CHANGELOG

## 2020.12.08 - v0.4.0

- 한 덩어리였던 함수를 단위 기능 별로 분리
- 'FormatOptions' enum 대신 객체로 변환
- 'MIXED' 옵션에서 잘못된 값은 모두 '0'으로 출력하도록 처리

## 2020.12.07 - v0.3.1

- Dependencies 업그레이드


## 2020.05.03 - v0.3.0

- 숫자-한글 병기 옵션 추가
- 테스트 케이스 추가

## 2020.05.01 - v0.2.1

- Webpack에서 Rollup으로 번들러 변경
- cjs, umd 파일 및 min 파일로 세분화
- unpkg, jsdelivr 등 CDN 지원용 파일 명시
- banner comment 부착

## 2020.04.29 - v0.2.0

- 만 단위 띄어쓰기 구현 ([#6](https://github.com/huskyhoochu/num-to-korean/issues/6))
- 브라우저 환경 구동을 위한 Webpack 설정 변경

## 2020.04.26 - v0.1.5

- 로직 간소화
- 불필요한 단위수 제거하는 함수를 filter로 변경

## 2020.04.25 - v0.1.4

- 로직 간소화
- 불필요한 reverse 연산을 줄여 가독성 향상

## 2020.04.24 - v0.1.3

- eslint, prettier 추가
- git hooks를 이용한 자동 포맷팅

## 2020.04.19 - v0.1.2

- webpack 번들러 추가
- build 파일에 minified 적용

## 2020.04.19 - v0.1.1

- jest를 이용한 테스트 케이스 추가
- travis CI 추가

## 2020.04.19 - v0.1.0

- 저장소 생성
- 초기 설정
