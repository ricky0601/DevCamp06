import React, { useState } from 'react';
import styled from 'styled-components';
import Title from '../components/common/Title';
import CartItem from '../components/cart/CartItem';
import { useCart } from '../hooks/useCart';

function Cart() {

    const {carts, deleteCartItem} = useCart();

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
            </CartStyle>
        </>
    );
}

const CartStyle = styled.div``;

export default Cart;