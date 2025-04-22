import React from 'react';
import styled from 'styled-components';
import { useCategory } from '../../hooks/useCategory';
import Button from '../common/Button';
import { useSearchParams } from 'react-router-dom';

function BooksFilter() {
    const { category } = useCategory();

    return (
        <BooksFilterStyle>
            <div className="category">
                {
                    category.map((item) => (
                        <Button size="medium" scheme="normal" key={item.category_id}>{item.category_name}</Button>
                    ))
                }
            </div>
            <div className="new">
                <Button size="medium" scheme='normal'>신간</Button>
            </div>
        </BooksFilterStyle>
    );
}

const BooksFilterStyle = styled.div`
    display: flex;
    gap: 24px;

    .category{
        display: flex;
        gap: 8px;
    }
`;

export default BooksFilter;