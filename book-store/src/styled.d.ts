import 'styled-components';

declare module 'styled-components' {
    export interface DefaultTheme {
        // 여기에 실제 사용하는 테마의 구조와 타입을 정의합니다.
        color: {
            primary: string,
            background: string,
            secondory : string,
            third : string,
            border : string,
            text : string,
            // secondary?: string; // 다른 색상 속성이 있다면 추가
            // background?: string;
            // text?: string;
        };
        heading : {
            [key in HeadingSize] : {
                fontSize: string;
            };
        };
        button : {
            [key in ButtonSize]: {
                fontSize: string;
                padding: string;
            }
        };
        buttonScheme: {
            [key in ButtonScheme]: {
                color : string;
                backgroundColor : string;
            }
        };
        borderRadius: {
            default: string;
        };
        layout : {
            width: {
                [key in LayoutWidth] : string;
            }
        }
    }
}
