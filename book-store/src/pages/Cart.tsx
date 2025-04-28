import React, { useState } from 'react';
import styled from 'styled-components';
import Title from '../components/common/Title';
import CartItem from '../components/cart/CartItem';
import { useCart } from '../hooks/useCart';
import Empty from '../components/common/Empty';
import { FaShoppingCart } from 'react-icons/fa';

function Cart() {

    const {carts, deleteCartItem, isEmpty} = useCart();

    const [ checkedItems, setCheckedItems] = useState<number[]>([]);

    const handleCheckItem = (id: number) => {
        // 언체크
        if(checkedItems.includes(id)){
            setCheckedItems(checkedItems.filter((item) => item !== id));
        }else{
            // 체크
            setCheckedItems([...checkedItems, id]);
        }
    };

    const handleItemDelete = (id: number) => {
        deleteCartItem(id);
    }

    return (
        <>
            <Title size='large'>장바구니</Title>
            <CartStyle>
                {
                    !isEmpty &&(
                        <>
                            <div className="content">
                                {
                                    carts.map((item) => (
                                        <CartItem
                                            cart={item}
                                            key={item.id}
                                            checkedItems={checkedItems}
                                            onCheck={handleCheckItem}
                                            onDelete={handleItemDelete}
                                        />
                                    ))
                                }
                            </div>
                            <div className="summary">
                                summary
                            </div>
                        </>
                    )
                }
                {
                    isEmpty && (
                        <Empty
                            title='장바구니가 비었습니다.'
                            icon={<FaShoppingCart />}
                            description={<>장바구니를 채워보세요.</>}
                        />
                    )
                }
            </CartStyle>
        </>
    );
}

const CartStyle = styled.div``;

export default Cart;