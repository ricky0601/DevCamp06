import { render, screen } from '@testing-library/react';

import InputText from './inputText';
import { BookStoreThemeProvider } from '../../context/themeContext';
import React from 'react';

describe("InputText 컴포넌트 테스트", () => {
    it('렌더를 확인', () => {
        // 1 렌더
        render(
            <BookStoreThemeProvider>
                <InputText placeholder='입력' />
            </BookStoreThemeProvider>
        )
        // 2 확인
        expect(screen.getByPlaceholderText('입력')).toBeInTheDocument();
    });

    it('forwardRef 테스트', () => {
        const ref = React.createRef<HTMLInputElement>();

        render(
            <BookStoreThemeProvider>
                <InputText placeholder='입력' ref={ref} />
            </BookStoreThemeProvider>
        );
        expect(ref.current).toBeInstanceOf(HTMLInputElement);
    })
});