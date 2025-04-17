import 'styled-components';

declare module 'styled-components' {
    export interface DefaultTheme {
        // 여기에 실제 사용하는 테마의 구조와 타입을 정의합니다.
        color: {
            primary: string,
            background: string,
            secondory : string,
            third : string,
            // secondary?: string; // 다른 색상 속성이 있다면 추가
            // background?: string;
            // text?: string;
        };
        // 다른 테마 속성들 (예: FONT_SIZE, PADDING 등)이 있다면 추가
        // typography?: { ... };
        // spacing?: { ... };
    }
}
