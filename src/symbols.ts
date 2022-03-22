export type Text = '' | '일' | '이' | '삼' | '사' | '오' | '육' | '칠' | '팔' | '구';
export type Power = '' | '십' | '백' | '천';
export type Dot = '' | '만' | '억' | '조' | '경';


// 한글로 바꿀 숫자 배열
export const textSymbol: Text[] = ['', '일', '이', '삼', '사', '오', '육', '칠', '팔', '구'];
// 4자리마다 반복되는 자릿수 배열
export const powerSymbol: Power[] = ['', '십', '백', '천'];
// 4자리마다 커지는 단위수 배열
export const dotSymbol: Dot[] = ['', '만', '억', '조', '경'];
